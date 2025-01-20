import {
  Approval as ApprovalEvent,
  Cancelled as CancelledEvent,
  Claimed as ClaimedEvent,
  ETHTransferFailed as ETHTransferFailedEvent,
  FeesCollected as FeesCollectedEvent,
  Initialized as InitializedEvent,
  Initialized1 as Initialized1Event,
  Launched as LaunchedEvent,
  PairUpdated as PairUpdatedEvent,
  StuckETHClaimed as StuckETHClaimedEvent,
  Subscribed as SubscribedEvent,
  Transfer as TransferEvent,
  Unsubscribed as UnsubscribedEvent
} from "../generated/AgentKey/AgentKey"
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
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCancelled(event: CancelledEvent): void {
  let entity = new Cancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.cooldownIndex = event.params.cooldownIndex
  entity.cooldown_amount = event.params.cooldown.amount
  entity.cooldown_claimableAt = event.params.cooldown.claimableAt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClaimed(event: ClaimedEvent): void {
  let entity = new Claimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.cooldownIndex = event.params.cooldownIndex
  entity.cooldown_amount = event.params.cooldown.amount
  entity.cooldown_claimableAt = event.params.cooldown.claimableAt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleETHTransferFailed(event: ETHTransferFailedEvent): void {
  let entity = new ETHTransferFailed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeesCollected(event: FeesCollectedEvent): void {
  let entity = new FeesCollected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokensSwapped = event.params.tokensSwapped
  entity.adminAmount = event.params.adminAmount
  entity.creatorAmount = event.params.creatorAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized1(event: Initialized1Event): void {
  let entity = new Initialized1(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLaunched(event: LaunchedEvent): void {
  let entity = new Launched(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePairUpdated(event: PairUpdatedEvent): void {
  let entity = new PairUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pair = event.params.pair

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStuckETHClaimed(event: StuckETHClaimedEvent): void {
  let entity = new StuckETHClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.receiver = event.params.receiver
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSubscribed(event: SubscribedEvent): void {
  let entity = new Subscribed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.ak = event.params.ak

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnsubscribed(event: UnsubscribedEvent): void {
  let entity = new Unsubscribed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.cooldownIndex = event.params.cooldownIndex
  entity.cooldown_amount = event.params.cooldown.amount
  entity.cooldown_claimableAt = event.params.cooldown.claimableAt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
