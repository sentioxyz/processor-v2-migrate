import { CapitalLedgerProcessor } from "./types/internal/capitalledger_processor";
import { getERC20TokenInfo, scaleDown } from "@sentio/sdk/lib/utils/token";
import { BigDecimal, CHAIN_IDS } from "@sentio/sdk";
import { BigNumber } from "ethers";
import { ERC20Processor } from "@sentio/sdk/lib/builtin/internal/erc20_processor";
import { getPriceByType } from "@sentio/sdk/lib/utils/price";
import { toBigDecimal } from "@sentio/sdk/lib/utils/conversion";

CapitalLedgerProcessor.bind({ address: "0x1111"})
  .onEventCapitalERC721Deposit((evt, ctx) => {
    const usdcValue: BigNumber = evt.args.usdcEquivalent
    const value: BigDecimal = scaleDown(usdcValue, 10)
    ctx.meter.Counter("c").add(value)
  })

ERC20Processor.bind({address: "0x222"})
  .onEventTransfer(async (evt, ctx) => {
    const info = await getERC20TokenInfo(evt.address)
    const price = await getPriceByType(CHAIN_IDS.ETHEREUM, ctx.address, ctx.timestamp)
    const value = toBigDecimal(evt.args.value).div(BigDecimal(10).plus(info.decimal)).multipliedBy(price)
    ctx.meter.Counter("x").add(value)
})