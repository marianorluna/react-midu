import { useFilters } from '../hooks/useFilters'
import './Filters.css'
import { useState, useId } from 'react'

export function Filters() {
    const { filters, setFilters } = useFilters()
    const minPriceFilteredId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (event) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        // AQUI TENDREMOS QUE CAMBIAR ALGO
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilteredId}>Price</label>
                <input
                    type="range"
                    id={minPriceFilteredId}
                    min='0'
                    max='1000'
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice}
                />
                <span>{filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Category</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">All</option>
                    <option value="groceries">Groceries</option>
                    <option value="beauty">Beauty</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="furniture">Furniture</option>
                </select>
            </div>
        </section>
    )
}