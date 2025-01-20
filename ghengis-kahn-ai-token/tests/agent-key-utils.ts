import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  Cancelled,
  Claimed,
  ETHTransferFailed,
  FeesCollected,
  Initialized,
  Initialized1,
  Launched,
  PairUpdated,
  StuckETHClaimed,
  Subscribed,
  Transfer,
  Unsubscribed
} from "../generated/AgentKey/AgentKey"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createCancelledEvent(
  account: Address,
  cooldownIndex: BigInt,
  cooldown: ethereum.Tuple
): Cancelled {
  let cancelledEvent = changetype<Cancelled>(newMockEvent())

  cancelledEvent.parameters = new Array()

  cancelledEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  cancelledEvent.parameters.push(
    new ethereum.EventParam(
      "cooldownIndex",
      ethereum.Value.fromUnsignedBigInt(cooldownIndex)
    )
  )
  cancelledEvent.parameters.push(
    new ethereum.EventParam("cooldown", ethereum.Value.fromTuple(cooldown))
  )

  return cancelledEvent
}

export function createClaimedEvent(
  account: Address,
  cooldownIndex: BigInt,
  cooldown: ethereum.Tuple
): Claimed {
  let claimedEvent = changetype<Claimed>(newMockEvent())

  claimedEvent.parameters = new Array()

  claimedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam(
      "cooldownIndex",
      ethereum.Value.fromUnsignedBigInt(cooldownIndex)
    )
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam("cooldown", ethereum.Value.fromTuple(cooldown))
  )

  return claimedEvent
}

export function createETHTransferFailedEvent(
  account: Address,
  amount: BigInt
): ETHTransferFailed {
  let ethTransferFailedEvent = changetype<ETHTransferFailed>(newMockEvent())

  ethTransferFailedEvent.parameters = new Array()

  ethTransferFailedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  ethTransferFailedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return ethTransferFailedEvent
}

export function createFeesCollectedEvent(
  tokensSwapped: BigInt,
  adminAmount: BigInt,
  creatorAmount: BigInt
): FeesCollected {
  let feesCollectedEvent = changetype<FeesCollected>(newMockEvent())

  feesCollectedEvent.parameters = new Array()

  feesCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "tokensSwapped",
      ethereum.Value.fromUnsignedBigInt(tokensSwapped)
    )
  )
  feesCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "adminAmount",
      ethereum.Value.fromUnsignedBigInt(adminAmount)
    )
  )
  feesCollectedEvent.parameters.push(
    new ethereum.EventParam(
      "creatorAmount",
      ethereum.Value.fromUnsignedBigInt(creatorAmount)
    )
  )

  return feesCollectedEvent
}

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createInitialized1Event(): Initialized1 {
  let initialized1Event = changetype<Initialized1>(newMockEvent())

  initialized1Event.parameters = new Array()

  return initialized1Event
}

export function createLaunchedEvent(): Launched {
  let launchedEvent = changetype<Launched>(newMockEvent())

  launchedEvent.parameters = new Array()

  return launchedEvent
}

export function createPairUpdatedEvent(pair: Address): PairUpdated {
  let pairUpdatedEvent = changetype<PairUpdated>(newMockEvent())

  pairUpdatedEvent.parameters = new Array()

  pairUpdatedEvent.parameters.push(
    new ethereum.EventParam("pair", ethereum.Value.fromAddress(pair))
  )

  return pairUpdatedEvent
}

export function createStuckETHClaimedEvent(
  account: Address,
  receiver: Address,
  amount: BigInt
): StuckETHClaimed {
  let stuckEthClaimedEvent = changetype<StuckETHClaimed>(newMockEvent())

  stuckEthClaimedEvent.parameters = new Array()

  stuckEthClaimedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  stuckEthClaimedEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  stuckEthClaimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return stuckEthClaimedEvent
}

export function createSubscribedEvent(
  account: Address,
  ak: BigInt
): Subscribed {
  let subscribedEvent = changetype<Subscribed>(newMockEvent())

  subscribedEvent.parameters = new Array()

  subscribedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  subscribedEvent.parameters.push(
    new ethereum.EventParam("ak", ethereum.Value.fromUnsignedBigInt(ak))
  )

  return subscribedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}

export function createUnsubscribedEvent(
  account: Address,
  cooldownIndex: BigInt,
  cooldown: ethereum.Tuple
): Unsubscribed {
  let unsubscribedEvent = changetype<Unsubscribed>(newMockEvent())

  unsubscribedEvent.parameters = new Array()

  unsubscribedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  unsubscribedEvent.parameters.push(
    new ethereum.EventParam(
      "cooldownIndex",
      ethereum.Value.fromUnsignedBigInt(cooldownIndex)
    )
  )
  unsubscribedEvent.parameters.push(
    new ethereum.EventParam("cooldown", ethereum.Value.fromTuple(cooldown))
  )

  return unsubscribedEvent
}
