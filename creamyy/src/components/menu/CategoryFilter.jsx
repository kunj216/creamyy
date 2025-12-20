import { useState } from "react";

const categories = ["All", "Cups", "Cones", "Sundaes", "Specials"];

function CategoryFilter(){
    const [selected, setSelected] = useState("All");
    return(
        <>
            {/* header  */}
            <div className="text-center text-8xl font-bold text-amber-800 italic bg-amber-100 shadow-md mx-4">Our Menu</div>

            {/* search and filter  */}
            <div className="flex gap-4  mt-3 items-center mx-4">
                <img src="src/assets/filter (2).png" alt="filter" className="w-10 h-10 object-contain"/>
                    {categories.map((cat) => (
                        <button
                        key={cat}
                        onClick={() => setSelected(cat)}
                        className={`
                            px-6 py-2 rounded-full font-semibold transition-all duration-200 shadow-md border-4 bg-gray-100
                            ${
                            selected === cat
                                ? "text-[#35fddc]"
                                : "text-[#6B6B6B] border-[#6B6B6B] hover:text-[#1bddbd] hover:border-[#1bddbd]"
                            }
                        `}
                        >
                        {cat}
                        </button>
                    ))}
            </div>
        </>
    )
}

export default CategoryFilter