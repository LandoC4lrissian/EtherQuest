"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='flex flex-row justify-around bg-gradient-to-r from-violet-600 to-indigo-600 pt-4'>
      <Link href={"/"}>
        <h1 className='font-bold text-4xl bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent'>EtherQuest</h1>
      </Link>
      <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => (
                  <div
                    {...(!mounted && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {!mounted || !account || !chain ? (
                      <button
                        className="customConnectButton"
                        onClick={openConnectModal}
                        type="button"
                      >
                        Connect Wallet
                      </button>
                    ) : chain.unsupported ? (
                      <button
                        className="customConnectButton"
                        onClick={openChainModal}
                        type="button"
                      >
                        Wrong network
                      </button>
                    ) : (
                      <div style={{ display: "flex", gap: 12 }}>
                        <button
                          className="customConnectButton"
                          onClick={openChainModal}
                          type="button"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 24,
                                height: 24,
                                borderRadius: 999,
                                overflow: "hidden",
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <Image
                                  alt={chain.name ?? "Chain icon"}
                                  src={chain.iconUrl}
                                  width={24}
                                  height={24}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </button>

                        <button
                          className="customConnectButton"
                          onClick={openAccountModal}
                          type="button"
                        >
                          {account.displayName}
                          {account.displayBalance &&
                            ` (${account.displayBalance})`}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </ConnectButton.Custom>
    </header>
  )
}

export default Header;