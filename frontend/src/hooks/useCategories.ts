import { categoryService } from '@/service/category.service';
import { CategoryItem } from '@/types/category.type';
import { useState, useEffect, useCallback } from 'react';

interface UseCategoriesResult {
    categories: CategoryItem[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useCategories(): UseCategoriesResult {
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await categoryService.getAllCategories();
            const rawData = result?.data ?? result;
            const finalCategories = Array.isArray(rawData) ? rawData : (rawData?.data ?? []);

            if (Array.isArray(finalCategories)) {
                setCategories(finalCategories as CategoryItem[]);
            } else {
                setCategories([]);
            }
        } catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { categories, loading, error, refetch: fetchCategories };
}
