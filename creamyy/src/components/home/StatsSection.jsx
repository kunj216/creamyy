function StatsSection(){
    return(
        <div className="py-20 bg-yellow-100 grid grid-cols-2 md:grid-cols-4 gap-5 text-center mx-4 shadow-md">
            <div className="flex flex-col gap-5">
                <div className="text-amber-800 text-8xl font-bold">20+</div>
                <div className="text-amber-800 text-2xl font-semibold">Flavours</div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="text-amber-800 text-8xl font-bold">5000+</div>
                <div className="text-amber-800 text-2xl font-semibold">Happy Customers</div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="text-amber-800 text-8xl font-bold">10+</div>
                <div className="text-amber-800 text-2xl font-semibold">Locations</div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="text-amber-800 text-8xl font-bold">Fresh</div>
                <div className="text-amber-800 text-2xl font-semibold">Made Daily</div>
            </div>
        </div>
    )
}

export default StatsSection