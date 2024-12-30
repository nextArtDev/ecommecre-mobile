import {
  ActivityIndicator,
  FlatList,
  Text,
  useWindowDimensions,
} from 'react-native'
import products from '../../assets/products.json'
import ProductListItem from '@/components/ProductListItem'
import { Button, ButtonText } from '@/components/ui/button'
import '@/global.css'
import { Box } from '@/components/ui/box'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect } from 'react'
import { listProducts } from '@/api/products'
import { useQuery } from '@tanstack/react-query'

export default function HomeScreen() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: listProducts,
  })
  // console.log({ data })
  const { width } = useWindowDimensions()
  const numColumns = width > 700 ? 3 : 2
  // const numColumns = useBreakpointValue({
  //   default: 2,
  //   sm: 3,
  //   xl: 4,
  // })
  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Error Fetching Products.</Text>
  }
  return (
    // <SafeAreaView>
    <FlatList
      // data={products}
      numColumns={numColumns}
      data={products.splice(0, 10)}
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
      columnWrapperClassName="gap-2"
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
    // </SafeAreaView>
  )
}
