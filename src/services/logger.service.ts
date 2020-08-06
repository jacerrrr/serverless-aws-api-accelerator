import { inject, injectable } from 'inversify';

import { Environment } from '@environment';

@injectable()
export class LoggerService {
  private _output: Function;
  private readonly logLevels: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(@inject('env') private readonly env: Environment) {
    // eslint-disable-next-line no-console
    this._output = console.log;

    // Log levels standard defined by Log4j
    this.logLevels = {
      off: 0,
      fatal: 100,
      error: 200,
      warn: 300,
      info: 400,
      debug: 500,
      trace: 600,
      all: 10000,
    };
  }

  // The log() function is an alias to allow our Logger class to be used as a logger for AWS sdk calls
  log(message, data, className?, correlationObject?): void {
    this.writeLog('info', message, data, className, correlationObject);
  }
  fatal(message, data, className?, correlationObject?): void {
    this.writeLog('fatal', message, data, className, correlationObject);
  }
  error(message, data, className?, correlationObject?): void {
    this.writeLog('error', message, data, className, correlationObject);
  }
  warn(message, data, className?, correlationObject?): void {
    this.writeLog('warn', message, data, className, correlationObject);
  }
  info(message, data, className?, correlationObject?): void {
    this.writeLog('info', message, data, className, correlationObject);
  }
  debug(message, data, className?, correlationObject?): void {
    this.writeLog('debug', message, data, className, correlationObject);
  }
  trace(message, data, className?, correlationObject?): void {
    this.writeLog('trace', message, data, className, correlationObject);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeLog(level: string, message: string, data: any, className: string, correlationObject = undefined): void {
    if (this.logLevels[level] <= this.logLevels[this.env.logLevel]) {
      let dataOutput = data !== undefined ? data : {};
      if (dataOutput instanceof Error) {
        // Improved serialization for Error objects
        dataOutput = 'Error message: ' + dataOutput.message + '; Stack: ' + dataOutput.stack;
      } else {
        try {
          // JSON.stringify data objects
          dataOutput = JSON.stringify(dataOutput);
        } catch (jsonError) {
          // squealch stringify errors so that we can output the original log message
          dataOutput = 'Unable to serialize error data';
        }
      }

      // Project-specific convention for Error output structure
      const outObject = {
        level: level,
        message: message,
        data: dataOutput,
        timestamp: new Date().toISOString(),
        location: className,
        correlationObject: correlationObject,
      };

      let outString: string;
      try {
        outString = JSON.stringify(outObject);
      } catch (err) {
        outString = `{"level":"error","message":"Error trying to serialize for logs; ${err}"}`;
      }

      // Mask secrets from being written to the logs
      // this.configSecrets.forEach(secret => {
      //   outString = outString && outString.replace(secret, '*****');
      // });

      this._output(outString);
    }
  }
}
