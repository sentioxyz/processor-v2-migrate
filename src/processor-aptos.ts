import { SouffleChefCampaign, CandyMachine } from './types/aptos/souffle.js'
import { getPriceBySymbol } from "@sentio/sdk/utils";

import { coin } from "@sentio/sdk/aptos/builtin/0x1"

SouffleChefCampaign.bind()
    .onEntryPullTokenV2((call, ctx) => {
      const value = getPriceBySymbol("token", new Date())
      ctx.meter.Counter('pulled').add(call.arguments_decoded[3])
    })
    .onEventBurnEnjoyEvent((evt, ctx) => {
      ctx.meter.Counter('burned').add(1)
    })

CandyMachine.bind().onEntryPullToken((call, ctx) => {
  ctx.meter.Counter('pulled').add(call.arguments_decoded[2], { coin: call.type_arguments[0] })
})


coin.bind().onEventDepositEvent((evt, ctx) => {
  ctx.meter.Counter("xx").add(evt.data_decoded.amount)
})
