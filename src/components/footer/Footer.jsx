import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden   bg-gray-400 border font-mono border-t-2 border-t-black p-4 mt-36">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className=" flex flex-wrap">
                    <div className="w-full md:w-1/2 lg:w-5/12 flex justify-center items-center">
                        <div className="mb-4">
                            <div className=" inline-flex items-center justify-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    &copy; Copyright 2024. All Rights Reserved by git-Das.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-2/12">
                        <div className="h-full md:mb-5">
                            <h3 className="tracking-px  text-xs font-semibold uppercase text-gray-500">
                                Company
                            </h3>
                            <ul>
                                <li className="">
                                    <Link
                                        className=" text-sm font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="">
                                    <Link
                                        className=" text-sm font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="">
                                    <Link
                                        className=" text-sm font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-sm font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-2/12 mb-4">
                        <div className="h-full">
                            <h3 className="  text-xs font-semibold uppercase text-gray-500">
                                Support
                            </h3>
                            <ul className='flex flex-col text-'>
                                <li className="">
                                    <Link
                                        className=" text-sm font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="">
                                    <Link
                                        className=" text-sm font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="">
                                    <Link
                                        className=" text-sm font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-sm font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-3/12 md:mb-4">
                        <div className="h-full">
                            <h3 className="tracking-px text-xs font-semibold uppercase text-gray-500">
                                Legals
                            </h3>
                            <ul>
                                <li className="">
                                    <Link
                                        className=" text-sm font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="">
                                    <Link
                                        className=" text-sm font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-sm font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer