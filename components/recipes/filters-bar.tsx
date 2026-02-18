'use client';

import { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FilterParams } from '@/lib/types';

interface FiltersBarProps {
  onFilterChange: (filters: Partial<FilterParams>) => void;
  cuisines: string[];
  currentFilters: Partial<FilterParams>;
}

export default function FiltersBar({
  onFilterChange,
  cuisines,
  currentFilters,
}: FiltersBarProps) {
  const [search, setSearch] = useState(currentFilters.search || '');
  const [selectedCuisine, setSelectedCuisine] = useState(
    currentFilters.cuisine || 'all'
  );
  const [selectedRating, setSelectedRating] = useState(
    currentFilters.minRating?.toString() || '0'
  );
  const [selectedTime, setSelectedTime] = useState(
    currentFilters.maxTime?.toString() || '300'
  );

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({
        search: search || undefined,
        cuisine: selectedCuisine,
        minRating: parseInt(selectedRating),
        maxTime: parseInt(selectedTime),
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [search, selectedCuisine, selectedRating, selectedTime, onFilterChange]);

  return (
    <div className="space-y-4 p-6 bg-card border border-border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Search</label>
          <Input
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Cuisine Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Cuisine</label>
          <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cuisines</SelectItem>
              {cuisines.map((cuisine) => (
                <SelectItem key={cuisine} value={cuisine}>
                  {cuisine}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Min Rating
          </label>
          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All Ratings</SelectItem>
              <SelectItem value="3">3.0+</SelectItem>
              <SelectItem value="4">4.0+</SelectItem>
              <SelectItem value="45">4.5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Time Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Max Time (min)
          </label>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
              <SelectItem value="300">Any time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
