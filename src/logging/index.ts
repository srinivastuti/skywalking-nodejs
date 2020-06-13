/*!
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import * as winston from 'winston';

export function createLogger(name: string) {
  const logger = winston.createLogger({
    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    format: winston.format.json(),
    defaultMeta: { service: name },
  });
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.prettyPrint(),
    }));
  } else {
    logger.add(new winston.transports.File({
      filename: 'skywalking.log',
    }));
  }
  return logger;
}