// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;

import '@pollum-io/v2-periphery/contracts/interfaces/INonfungiblePositionManager.sol';
import '@pollum-io/v2-core/contracts/interfaces/IPegasysV2Factory.sol';
import '@pollum-io/v2-core/contracts/interfaces/IPegasysV2Pool.sol';

import '@pollum-io/v2-periphery/contracts/libraries/PoolAddress.sol';

/// @notice Encapsulates the logic for getting info about a NFT token ID
library NFTPositionInfo {
    /// @param factory The address of the Pegasys V2 Factory used in computing the pool address
    /// @param nonfungiblePositionManager The address of the nonfungible position manager to query
    /// @param tokenId The unique identifier of an Pegasys V2 LP token
    /// @return pool The address of the Pegasys V2 pool
    /// @return tickLower The lower tick of the Pegasys V2 position
    /// @return tickUpper The upper tick of the Pegasys V2 position
    /// @return liquidity The amount of liquidity staked
    function getPositionInfo(
        IPegasysV2Factory factory,
        INonfungiblePositionManager nonfungiblePositionManager,
        uint256 tokenId
    ) internal view returns (IPegasysV2Pool pool, int24 tickLower, int24 tickUpper, uint128 liquidity) {
        address token0;
        address token1;
        uint24 fee;
        (, , token0, token1, fee, tickLower, tickUpper, liquidity, , , , ) = nonfungiblePositionManager.positions(
            tokenId
        );

        pool = IPegasysV2Pool(
            PoolAddress.computeAddress(
                address(factory),
                PoolAddress.PoolKey({token0: token0, token1: token1, fee: fee})
            )
        );
    }
}
