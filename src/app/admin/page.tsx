
export default function Home() {

    return (
        <>
            <div className="h-full grow shrink space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="backdrop-blur-lg bg-gray-50/5 rounded-xl py-10 flex flex-col items-center text-white gap-y-5">
                        <div>Total Plays</div>
                        <div className="text-5xl">24</div>
                        <div>
                            <select name="total_plays" title="total_plays" className="border rounded-full px-3 py-1">
                                <option value="" className="text-black">Today</option>
                                <option value="" className="text-black">This Week</option>
                                <option value="" className="text-black">This Month</option>
                                <option value="" className="text-black">This Year</option>
                                <option value="" className="text-black">Past 6 Months</option>
                            </select>
                        </div>
                    </div>

                    <div className="backdrop-blur-lg bg-gray-50/5 rounded-xl py-10 flex flex-col items-center text-white gap-y-5">
                        <div>Total Downloads</div>
                        <div className="text-5xl">24</div>
                        <div>
                            <select name="total_plays" title="total_plays" className="border rounded-full px-3 py-1">
                                <option value="" className="text-black">Today</option>
                                <option value="" className="text-black">This Week</option>
                                <option value="" className="text-black">This Month</option>
                                <option value="" className="text-black">This Year</option>
                                <option value="" className="text-black">Past 6 Months</option>
                            </select>
                        </div>
                    </div>

                    <div className="backdrop-blur-lg bg-gray-50/5 rounded-xl py-10 flex flex-col items-center text-white gap-y-5">
                        <div>Social Media Visits</div>
                        <div className="text-5xl">24</div>
                        <div>
                            <select name="total_plays" title="total_plays" className="border rounded-full px-3 py-1">
                                <option value="" className="text-black">Today</option>
                                <option value="" className="text-black">This Week</option>
                                <option value="" className="text-black">This Month</option>
                                <option value="" className="text-black">This Year</option>
                                <option value="" className="text-black">Past 6 Months</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="backdrop-blur-lg bg-gray-50/5 rounded-xl py-10 flex flex-col items-center text-white gap-y-5">
                        <div>Most Played</div>
                        <div className="text-5xl">24</div>
                        <div>
                            <select name="total_plays" title="total_plays" className="border rounded-full px-3 py-1">
                                <option value="" className="text-black">Today</option>
                                <option value="" className="text-black">This Week</option>
                                <option value="" className="text-black">This Month</option>
                                <option value="" className="text-black">This Year</option>
                                <option value="" className="text-black">Past 6 Months</option>
                            </select>
                        </div>
                    </div>

                    <div className="backdrop-blur-lg bg-gray-50/5 rounded-xl py-10 flex flex-col items-center text-white gap-y-5">
                        <div>Most Downloaded</div>
                        <div className="text-5xl">24</div>
                        <div>
                            <select name="total_plays" title="total_plays" className="border rounded-full px-3 py-1">
                                <option value="" className="text-black">Today</option>
                                <option value="" className="text-black">This Week</option>
                                <option value="" className="text-black">This Month</option>
                                <option value="" className="text-black">This Year</option>
                                <option value="" className="text-black">Past 6 Months</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}