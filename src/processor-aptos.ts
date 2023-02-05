import { SouffleChefCampaign, CandyMachine } from './types/aptos/souffle'
import { getPriceBySymbol } from "@sentio/sdk/lib/utils/price";

import { coin } from "@sentio/sdk-aptos/lib/builtin/0x1"

SouffleChefCampaign.bind()
    .onEntryPullTokenV2((call, ctx) => {
      const value = getPriceBySymbol("token", new Date())
      ctx.meter.Counter('pulled').add(call.arguments_typed[3])
    })
    .onEventBurnEnjoyEvent((evt, ctx) => {
      ctx.meter.Counter('burned').add(1)
    })

CandyMachine.bind().onEntryPullToken((call, ctx) => {
  ctx.meter.Counter('pulled').add(call.arguments_typed[2], { coin: call.type_arguments[0] })
})


coin.bind().onEventDepositEvent((evt, ctx) => {
  ctx.meter.Counter("xx").add(evt.data_typed.amount)
})
