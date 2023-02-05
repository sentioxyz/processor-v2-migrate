import { CapitalLedgerProcessor } from "./types/capitalledger/index.js";
import { getERC20TokenInfo  } from "@sentio/sdk/utils";
import { BigDecimal, CHAIN_IDS, scaleDown } from "@sentio/sdk";
import { ERC20Processor } from "@sentio/sdk/eth/builtin/erc20";
import { getPriceByType } from "@sentio/sdk/utils";

CapitalLedgerProcessor.bind({ address: "0x1111"})
  .onEventCapitalERC721Deposit((evt, ctx) => {
    const usdcValue: bigint = evt.args.usdcEquivalent
    const value: BigDecimal = usdcValue.scaleDown(10)
    ctx.meter.Counter("c").add(value)
  })

ERC20Processor.bind({address: "0x222"})
  .onEventTransfer(async (evt, ctx) => {
    const info = await getERC20TokenInfo(evt.address)
    const price = await getPriceByType(CHAIN_IDS.ETHEREUM, ctx.address, ctx.timestamp)
    const value = evt.args.value.asBigDecimal().div(BigDecimal(10).plus(info.decimal)).multipliedBy(price)
    ctx.meter.Counter("x").add(value)
})