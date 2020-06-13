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

import StackedSpan from '@/trace/span/StackedSpan';
import { SpanCtorOptions } from '@/trace/span/Span';
import { ContextCarrier } from '@/trace/context/Carrier';
import config from '@/config/AgentConfig';
import { SpanType } from '@/proto/language-agent/Tracing_pb';

export default class ExitSpan extends StackedSpan {
  constructor(options: SpanCtorOptions) {
    super(Object.assign(options, {
      type: SpanType.EXIT,
    }));
  }

  start(): this {
    this.depth++;
    return super.start();
  }

  inject(carrier: ContextCarrier): this {
    carrier.traceId = this.context.segment.relatedTraces[0].toString();
    carrier.segmentId = this.context.segment.segmentId.toString();
    carrier.spanId = this.id;
    carrier.service = config.serviceName;
    carrier.serviceInstance = config.serviceInstance;
    carrier.endpoint = this.context.spans[0].operation;
    carrier.clientAddress = this.peer;

    return this;
  }
}