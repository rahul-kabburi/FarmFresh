import React, { useEffect, useState } from 'react'
import { useCart } from '../pages/CartContext'
import { itemsPageStyles } from '../assets/dummyStyles';
import { FiArrowLeft, FiChevronUp, FiChevronDown, FiMinus, FiPlus, FiSearch } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { groceryData } from '../assets/dummyDataItem'

//Product Card
const ProductCard = ({ item }) => {
    const { cart, addToCart, removeFromCart, updateQuantity } = useCart()

    //Get current Quantity
    const cartItem = cart.find(cartItem => cartItem.id === item.id)
    const quantity = cartItem ? cartItem.quantity : 0

    //Add To cart (Cart functionalities)
    const handleAddToCart = () => {
        addToCart(item)
    }
    const handleIncrement = () => {
        if (quantity === 0) {
            addToCart(item)
        } else {
            updateQuantity(item.id, quantity + 1)
        }
    }
    const handleDecrement = () => {
        if (quantity > 1) {
            updateQuantity(item.id, quantity - 1)
            
        } else {
            removeFromCart(item.id)
        }
    }

    {/**Return jsx for product card */ }
    return (
        <div className={itemsPageStyles.productCard}>
            {/**Shows product image */}
            <div className={itemsPageStyles.imageContainer}>
                <img src={item.image} alt={item.name} className={itemsPageStyles.productImage} />
            </div>

            {/**Shows product name(title) */}
            <div className={itemsPageStyles.cardContent}>
                <div className={itemsPageStyles.titleContainer}>
                    <h3 className={itemsPageStyles.productTitle}> {item.name} </h3>
                    <span className={itemsPageStyles.organicTag}>Organic</span>
                </div>

                {/**Shows product description */}
                <p className={itemsPageStyles.productDescription}>
                    {item.description || `Fresh Organnic ${item.name.toLowerCase()} sourced locally`}
                </p>

                {/**Shows product price */}
                <div className={itemsPageStyles.priceContainer}>
                    <span className={itemsPageStyles.currentPrice}>{item.price.toFixed(2)}</span>
                    <span className={itemsPageStyles.oldPrice}>{item.price.toFixed(2)}</span>
                </div>

                {/**Shows product Add to Cart button or + / - quantity controls based on quantity */}
                <div className=' mt-3'>
                    {quantity > 0 ? (
                        <div className={itemsPageStyles.quantityControls}>
                            <button onClick={handleDecrement} className={`${itemsPageStyles.quantityButton} ${itemsPageStyles.quantityButtonLeft}`}> {/**shows - contol button */}
                                <FiMinus />
                            </button>

                            <span className={itemsPageStyles.quantityValue}>{quantity}</span> {/**shows quantity of the product added */}

                            <button onClick={handleIncrement} className={`${itemsPageStyles.quantityButton} ${itemsPageStyles.quantityButtonRight}`}>  \{/**Shows + control button */}
                                <FiPlus />
                            </button>
                        </div>
                    ) : (
                            <button onClick={handleAddToCart} className={itemsPageStyles.addButton}> \{/**Shows add to cart button */}
                            <span>Add To Cart</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}


const Item = () => {
    const navigate = useNavigate()
    const[searchTrem, setSearchTerm] = useState('')
    const location = useLocation()
    const [expandedCategories, setExpandedCategories] = useState({})
    const[allExpanded, setAllExpanded] = useState(false)

    //search query from url
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const search = queryParams.get('search')

        if(search){
            setSearchTerm(search)
        }
    },[location])

    //Enhance search (search matching)
    const itemMatchesSearch = (item, term) => {
        if(!term) return true; //if no search term typed in searchbox, return true
        const cleanTerm = term.trim().toLowerCase()
        const searchWords = cleanTerm.split(/\s+/)

        return searchWords.every(word => item.name.toLowerCase().includes(word)) //check if all words are in item name
    }
    //Filter (we use filter two times because {(filter(item => ...)= filters item inside each category based on search)} {(filter(category => ...)= hides entire categories with no matching items )})
    const filteredData = searchTrem
    ? groceryData.map(category => ({
        ...category,
        items: category.items.filter(item => itemMatchesSearch(item, searchTrem))
    })).filter(category => category.items.length > 0) : groceryData

    //clear search
    const clearSearch = () =>{
        setSearchTerm('')
        navigate('/items')
    }

    //toggle category (if the category is open then close it if closed open it)
    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId] : !prev[categoryId] //[] refers to particular category (eg if fruits is opened then close it )
        }))
    }
    const toggleAllCategories = () => {
        if(allExpanded){
            setExpandedCategories({})
        }else{
            const expanded = {};
            groceryData.forEach(category => {
                expanded[category.id] == true
            })
            setExpandedCategories(expanded)
        }
        setAllExpanded(!allExpanded)
    }
    return (
        <div className={itemsPageStyles.page}>
            <div className={itemsPageStyles.container}>
                <header className={itemsPageStyles.header}>

                    <h1 className={itemsPageStyles.mainTitle}>
                        <span className={itemsPageStyles.titleSpan}>ORGANIC</span> PANTRY
                    </h1>
                    <p className={itemsPageStyles.subtitle}>
                        Premium Quality Groceries Sourced From Local Farms
                    </p>
                    <div className={itemsPageStyles.titleDivider}>
                        <div className={itemsPageStyles.dividerLine}></div>
                    </div>
                </header>
                {/**Search Bar */}
                <div className={itemsPageStyles.searchContainer}>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        if(searchTrem.trim()){
                            navigate(`/items?search=${encodeURIComponent(searchTrem)}`)
                        }
                    }} className={itemsPageStyles.searchForm}>
                        <input type="text" value={searchTrem} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search for fruits, vegetables...'className={itemsPageStyles.searchInput} />
                        <button type='submit' className={itemsPageStyles.searchButton}><FiSearch className=' h-5 w-5'/></button>
                    </form>
                </div>
                
                <div className=' flex justify-center mb-10'>
                    <button onClick={toggleAllCategories} className={itemsPageStyles.expandButton}>
                        <span className=' mr-2 font-medium'>
                            {allExpanded ? 'Collapse All' : 'Expand All'}
                        </span>
                        {allExpanded ? <FiMinus/> : <FiPlus/>}
                    </button>
                </div>
                {filteredData.length > 0 ?(
                    filteredData.map(category => {
                        const isExpanded = expandedCategories[category.id] || allExpanded
                        const visibleItems = isExpanded ? category.items : category.items.slice(0,4)
                        const hasMoreItems = category.items.length > 4;

                        return(
                            <section key={category.id} className={itemsPageStyles.categorySection}>
                                <div className={itemsPageStyles.categoryHeader}>
                                    <div className={itemsPageStyles.categoryIcon}></div>
                                    <h2 className={itemsPageStyles.categoryTitle}>{category.name}</h2>
                                    <div className={itemsPageStyles.categoryDivider}></div>
                                </div>
                                <div className={itemsPageStyles.productsGrid}>
                                    {visibleItems.map(item => (
                                        <ProductCard key = {item.id} item={item} />
                                    ))}
                                </div>
                                {hasMoreItems && (
                                    <div className=' mt-8 flex justify-center'>
                                        <button onClick={() => toggleCategory(category.id)} className={itemsPageStyles.showMoreButton}>
                                            <span className=' mr-2 font-medium'>
                                                {isExpanded ? `show less ${category.name}` : `show more ${category.name} (${category.items.length - 4}+)`}
                                            </span>
                                            {isExpanded ? <FiChevronUp className=' text-lg'/> : <FiChevronDown className=' text-lg'/>}
                                        </button>
                                    </div>
                                )}
                            </section>
                        )
                    })
                ) : (
                    <div className={itemsPageStyles.noProductsContainer}>
                        <div className={itemsPageStyles.noProductsCard}>
                            <div className={itemsPageStyles.noProductsIcon}>
                                <FiSearch className=' mx-auto h-16 w-16'/>
                            </div>
                            <h3 className={itemsPageStyles.noProductsTitle}>
                                No Products Found
                            </h3>
                            <p className={itemsPageStyles.noProductsText}>
                                We couldn't find any items matching "{searchTrem}"
                            </p>
                            <button onClick={clearSearch} className={itemsPageStyles.clearSearchButton}>
                                clear search
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Item
