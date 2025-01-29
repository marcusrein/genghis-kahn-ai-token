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
	Unsubscribed as UnsubscribedEvent,
} from "../generated/AgentKey/AgentKey";

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
	Unsubscribed,
	NewSubscriberData,
	NewUnsubscriberData,
	ActiveMember,
} from "../generated/schema";

import { store, Bytes } from "@graphprotocol/graph-ts";

/**
 * These event handlers each mint a corresponding entity when an event occurs.
 * Below, we've updated the subscription logic so that ActiveMember is keyed by
 * each subscriber's address. When the user subscribes, we set or update the
 * ActiveMember entity to store their AK amount and the transaction that made them subscribe. When
 * they unsubscribe, we remove that ActiveMember from the store.
 */

export function handleApproval(event: ApprovalEvent): void {
	let entity = new Approval(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity.owner = event.params.owner;
	entity.spender = event.params.spender;
	entity.value = event.params.value;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();
}

export function handleCancelled(event: CancelledEvent): void {
	let entity = new Cancelled(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity.account = event.params.account;
	entity.cooldownIndex = event.params.cooldownIndex;
	entity.cooldown_amount = event.params.cooldown.amount;
	entity.cooldown_claimableAt = event.params.cooldown.claimableAt;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();
}

export function handleClaimed(event: ClaimedEvent): void {
	let entity = new Claimed(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity.account = event.params.account;
	entity.cooldownIndex = event.params.cooldownIndex;
	entity.cooldown_amount = event.params.cooldown.amount;
	entity.cooldown_claimableAt = event.params.cooldown.claimableAt;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();
}

export function handleETHTransferFailed(event: ETHTransferFailedEvent): void {
	let entity = new ETHTransferFailed(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity.account = event.params.account;
	entity.amount = event.params.amount;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();
}

export function handleFeesCollected(event: FeesCollectedEvent): void {
	let entity = new FeesCollected(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity.tokensSwapped = event.params.tokensSwapped;
	entity.adminAmount = event.params.adminAmount;
	entity.creatorAmount = event.params.creatorAmount;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();
}

export function handleInitialized(event: InitializedEvent): void {
	let entity = new Initialized(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity.version = event.params.version;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();
}

export function handleInitialized1(event: Initialized1Event): void {
	let entity = new Initialized1(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();
}

export function handleLaunched(event: LaunchedEvent): void {
	let entity = new Launched(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();
}

export function handlePairUpdated(event: PairUpdatedEvent): void {
	let entity = new PairUpdated(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity.pair = event.params.pair;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();
}

export function handleStuckETHClaimed(event: StuckETHClaimedEvent): void {
	let entity = new StuckETHClaimed(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity.account = event.params.account;
	entity.receiver = event.params.receiver;
	entity.amount = event.params.amount;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();
}

/**
 * Whenever a user subscribes: create a Subscribed entity, a NewSubscriberData,
 * and update (or create) the ActiveMember entity keyed by their address (in hex).
 */
export function handleSubscribed(event: SubscribedEvent): void {
	let subscribedEntity = new Subscribed(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	subscribedEntity.account = event.params.account;
	subscribedEntity.ak = event.params.ak;
	subscribedEntity.blockNumber = event.block.number;
	subscribedEntity.blockTimestamp = event.block.timestamp;
	subscribedEntity.transactionHash = event.transaction.hash;
	subscribedEntity.save();

	let newSubEntity = new NewSubscriberData("pseudo-sub-id");
	newSubEntity.account = event.params.account;
	newSubEntity.isNewSubscriber = true;
	newSubEntity.save();

	// Use the account in hex as the entity ID
	let activeMemberId = event.params.account.toHexString();
	let activeMemberEntity = ActiveMember.load(activeMemberId);
	if (!activeMemberEntity) {
		activeMemberEntity = new ActiveMember(activeMemberId);
	}

	activeMemberEntity.account = event.params.account;
	activeMemberEntity.ak = event.params.ak;
	activeMemberEntity.subscribedTxHash = event.transaction.hash;
	activeMemberEntity.save();
}

/**
 * Whenever a user unsubscribes: create Unsubscribed and NewUnsubscriberData,
 * then remove that user from ActiveMember using the hex ID. This ensures
 * only truly active subscribers remain.
 */
export function handleUnsubscribed(event: UnsubscribedEvent): void {
	let unsubEntity = new Unsubscribed(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	unsubEntity.account = event.params.account;
	unsubEntity.cooldownIndex = event.params.cooldownIndex;
	unsubEntity.cooldown_amount = event.params.cooldown.amount;
	unsubEntity.cooldown_claimableAt = event.params.cooldown.claimableAt;
	unsubEntity.blockNumber = event.block.number;
	unsubEntity.blockTimestamp = event.block.timestamp;
	unsubEntity.transactionHash = event.transaction.hash;
	unsubEntity.save();

	let timeSeriesPoint = new NewUnsubscriberData("pseudo-unsub-id");
	timeSeriesPoint.account = event.params.account;
	timeSeriesPoint.isNewUnsubscriber = true;
	timeSeriesPoint.save();

	// Remove the ActiveMember by hex ID
	let activeMemberId = event.params.account.toHexString();
	let activeMemberEntity = ActiveMember.load(activeMemberId);
	if (activeMemberEntity) {
		store.remove("ActiveMember", activeMemberId);
	}
}

export function handleTransfer(event: TransferEvent): void {
	let entity = new Transfer(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity.from = event.params.from;
	entity.to = event.params.to;
	entity.value = event.params.value;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();
}
