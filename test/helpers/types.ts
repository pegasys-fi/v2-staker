import { BigNumber, Wallet } from 'ethers'
import { TestERC20 } from '../../typechain'

import { UniswapV3Staker } from '../../typechain'

export module HelperTypes {
  export type CommandFunction<Input, Output> = (input: Input) => Promise<Output>

  export module CreateIncentive {
    export type Args = {
      rewardToken: TestERC20
      poolAddress: string
      startTime: number
      endTime?: number
      claimDeadline?: number
      totalReward: BigNumber
      beneficiary?: string
    }
    export type Result = {
      poolAddress: string
      rewardToken: TestERC20
      totalReward: BigNumber
      startTime: number
      endTime: number
      claimDeadline: number
      beneficiary: string
    }

    export type Command = CommandFunction<Args, Result>
  }

  export module MintStake {
    type Args = {
      lp: Wallet
      tokensToStake: [TestERC20, TestERC20]
      amountsToStake: [BigNumber, BigNumber]
      ticks: [number, number]
      createIncentiveResult: CreateIncentive.Result
    }

    export type Result = {
      lp: Wallet
      tokenId: string
      stakedAt: number
    }

    export type Command = CommandFunction<Args, Result>
  }

  export module UnstakeCollectBurn {
    type Args = {
      lp: Wallet
      tokenId: string
      createIncentiveResult: CreateIncentive.Result
    }
    export type Result = {
      balance: BigNumber
      unstakedAt: number
    }

    export type Command = CommandFunction<Args, Result>
  }

  export module EndIncentive {
    type Args = {
      createIncentiveResult: CreateIncentive.Result
    }

    type Result = {
      amountReturnedToCreator: BigNumber
    }

    export type Command = CommandFunction<Args, Result>
  }

  export module MakeTickGo {
    type Args = {
      direction: 'up' | 'down'
      desiredValue?: number
      trader?: Wallet
    }

    type Result = { currentTick: number }

    export type Command = CommandFunction<Args, Result>
  }

  export module GetIncentiveId {
    type Args = CreateIncentive.Result

    // Returns the incentiveId as bytes32
    type Result = string

    export type Command = CommandFunction<Args, Result>
  }
}
