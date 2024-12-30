import { FlatList, Text, useWindowDimensions } from 'react-native'
import products from '../../assets/products.json'
import ProductListItem from '@/components/ProductListItem'
import { Button, ButtonText } from '@/components/ui/button'
import '@/global.css'
import { Box } from '@/components/ui/box'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect } from 'react'
import { listProducts } from '@/api/products'

export default function HomeScreen() {
  useEffect(() => {
    listProducts()
  }, [])
  const { width } = useWindowDimensions()
  const numColumns = width > 700 ? 3 : 2
  // const numColumns = useBreakpointValue({
  //   default: 2,
  //   sm: 3,
  //   xl: 4,
  // })
  return (
    <SafeAreaView>
      <FlatList
        data={products}
        numColumns={numColumns}
        // data={products.splice(0, 10)}
        contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
        columnWrapperClassName="gap-2"
        renderItem={({ item }) => <ProductListItem product={item} />}
      />
    </SafeAreaView>
  )
}
