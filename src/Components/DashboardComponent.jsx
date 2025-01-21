
export default function DashboardComponent() {
    return (
        <div className="w-full h-screen flex flex-col">
        {/*    Top Part*/}
            <div className="h-[7%] flex flex-row items-center justify-end space-x-5">
                <div className="flex flex-row space-x-2 items-center">
                    <div>
                        <svg
                            className="w-[32px] h-[32px]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                        >
                            <polygon points="16,0 32,16 16,32 0,16" fill="#A020F0"/>
                            <polygon points="16,0 24,16 16,24 8,16" fill="#C71585"/>
                            <path
                                d="M16 12 L17 15 L20 16 L17 17 L16 20 L15 17 L12 16 L15 15 Z"
                                fill="white"
                            />
                        </svg>
                    </div>

                    <div>2000</div>
                </div>
                <div>
                    <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"/>
                    </svg>
                </div>

                <div>
                    <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                              d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                              clip-rule="evenodd"/>
                    </svg>
                </div>

            </div>
            {/*    Middle Part*/}
            <div></div>
            {/*    Bottom Part*/}
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}