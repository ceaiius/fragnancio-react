import { fetchCategories } from "@/services/filters";
import SelectInput from "./Forms/SelectInput"
import { useState, useEffect } from "react";
import type { Category } from "@/types/category";
import type { Brand } from "@/types/brand";
import { fetchAllBrands } from "@/services/brands";
import { SIZE_OPTIONS, CONDITION_OPTIONS } from "@/constants/options";

const Create = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
    const [selectedSize, setSelectedSize] = useState<typeof SIZE_OPTIONS[0] | null>(null);
    const [selectedCondition, setSelectedCondition] = useState<typeof CONDITION_OPTIONS[0] | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(selectedCategory, selectedBrand, selectedSize, selectedCondition, title, description, price);
    }

    useEffect(() => {
        fetchCategories().then(setCategories);
        fetchAllBrands().then(setBrands);
    }, []);

    return (
        <main className="mx-auto w-full max-w-[640px] font-mono px-4 pt-8 pb-36">
            <header className="flex items-center mb-6 pb-2 border-b border-gray-default">
                <h1 className="font-bold text-2xl leading-6 text-black-default">List an item</h1>
            </header>
            <div className="flex flex-col">
                <form className="flex flex-col gap-4 " onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-col gap-2">
                        <div>
                            <label htmlFor="title" className="font-bold text-lg leading-6 text-black-default">Title</label>
                            <input id="title" name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="eg. Armani Code"
                            className={`w-full px-3 py-2 mt-2 border rounded focus:outline-none focus:ring-2 focus:ring-black/30 transition text-gray-900 bg-white`}/>
                        </div>
                        <div>
                            <label htmlFor="description" className="font-bold text-lg leading-6 text-black-default">Description</label>
                            <textarea id="description" className="w-full h-24 border  border-gray-default rounded-md px-3 py-2  mt-2" placeholder="eg. 50ml Armani Code brand new" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-bold text-lg leading-6 text-black-default">Info</h2>
                        <SelectInput<Category>
                            label="Category"
                            options={categories}
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                        />
                        <SelectInput<Brand>
                            label="Brand"
                            options={brands}
                            value={selectedBrand}
                            onChange={setSelectedBrand}
                        />
                        <SelectInput
                            label="Size"
                            options={SIZE_OPTIONS}
                            value={selectedSize}
                            onChange={setSelectedSize}
                        />
                        <SelectInput
                            label="Condition"
                            options={CONDITION_OPTIONS}
                            value={selectedCondition}
                            onChange={setSelectedCondition}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-bold text-lg leading-6 text-black-default">Item price</h2>
                        <div className="mt-2">
                            <label htmlFor="price" className="text-xs text-gray-label block leading-6 mb-1">Price $</label>
                            <input id="price" name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} 
                            className={`w-1/3 px-3 py-2  border rounded focus:outline-none focus:ring-2 focus:ring-black/30 transition text-gray-900 bg-white`}/>
                        </div>
                    </div>
                    <button type="submit" className="bg-black-default text-white px-4 py-2 mt-6 rounded-xs font-bold  cursor-pointer">Create</button>
                </form>
            </div>
        </main>
    )
}

export default Create