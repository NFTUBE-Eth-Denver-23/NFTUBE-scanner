/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect } from 'react'
import {
  RootStackScreenProps,
  navigate,
  navigateGoBack,
} from '@/navigators/utils'

import { AppHeader } from '@/components/AppHeader'
import { Asset } from '@/types/Asset'
import { CTAButton } from '@/components/button'
import { ChainTag } from '@/types/ChainId'
import FastImage from 'react-native-fast-image'
import { Spacing } from '@/components/Spacing'
import { User } from '@/types/User'
import { chainIdByTag } from '@/utils/getChain'
import getSize from '@/utils/getSize'
import { queryAssetsByNFTId } from '@/api/assets'
import { queryWalletByUserIdAndChain } from '@/api/wallets'
import { useBrowsingChain } from '@/hooks/useBrowsingChain'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { useStyle } from './style'
import { useTheme } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { userState } from '@/store/user/userState'

export const maskingName = (strName: string) => {
  if (strName) {
    if (strName.length > 2) {
      const originName = strName.split('')
      let joinName: string[] = originName.filter((name, i) => {
        if (i < 6 || i > originName.length - 5) {
          return name
        }
      })
      joinName = joinName.join('')
      const b = '...'
      const position = 6
      const output = [
        joinName.slice(0, position),
        b,
        joinName.slice(position),
      ].join('')
      return output
    }
  }
}

const ScannerDetail = ({
  route: { params },
}: RootStackScreenProps<'ScannerDetail'>) => {
  const user = useRecoilValue<User>(userState)
  const { browsingChainId } = useBrowsingChain()
  const { t } = useTranslation()
  const { Layout, Common, Images } = useTheme()
  const { heightPercentage, widthPercentage } = getSize()
  const { styles } = useStyle()

  const { data: walletData } = useQuery(
    user.userId && ['query_wallet', user.userId],
    async () => {
      return await queryWalletByUserIdAndChain({
        userId: user.userId,
        chainId: browsingChainId,
      })
    },
  )

  const {
    data: assetsData,
    isLoading: assetsLoading,
    refetch: refetchAssets,
  } = useQuery(
    params.nftData?.nftId &&
      walletData &&
      params.collectionData?.collectionId && [
        'query_assets_by_nft_id',
        params.nftData?.nftId,
        walletData,
        params.collectionData?.creatorAddress,
      ],
    async () => {
      return await queryAssetsByNFTId(params.nftData?.nftId, {
        userId: user?.userId,
        creatorAddress: params.collectionData?.creatorAddress,
        walletAddress: walletData,
      })
    },
    {
      enabled: !!walletData,
    },
  )

  const onPressAsset = (item: Asset) => {
    navigate('AssetDetail', {
      assetData: item,
      collectionData: params.collectionData,
      nftData: params.nftData,
    })
  }
  // eslint-disable-next-line react/no-unstable-nested-components
  const Item = ({ item }: { item: Asset }) => (
    <TouchableOpacity
      style={{
        width: widthPercentage(100),
        height: widthPercentage(100),
        marginRight: widthPercentage(15),
      }}
      onPress={() => onPressAsset(item)}
    >
      {item.visibility ? null : (
        <View
          style={[
            Layout.fill,
            Layout.center,
            {
              ...StyleSheet.absoluteFillObject,
              zIndex: 1000,
              backgroundColor: 'rgba(0, 0, 0, 0.4))',
              borderRadius: 10,
            },
          ]}
        >
          <Images.eyeOff width={19} height={19} />
        </View>
      )}
      <FastImage
        style={{ flex: 1, borderRadius: 10 }}
        source={{ uri: item.assetURL }}
      />
    </TouchableOpacity>
  )

  const renderItem = ({ item }: { item: Asset }) => <Item item={item} />

  const onPress = () => {
    if (params.isFlashOn) {
      params.onReturn({ isFlashOn: params.isFlashOn })
    }
    navigateGoBack()
  }

  const onPressProfile = (user: User) => {
    navigate('Profile', { userData: user })
  }

  const onVisitMarket = async () => {
    if (params.nftData.marketplaceURL) {
      await Linking.openURL(params.nftData.marketplaceURL)
    }
  }

  return (
    <View style={[Layout.fill]}>
      <AppHeader
        title={params.nftData?.name}
        back={true}
        onPressBack={onPress}
      />
      <ScrollView style={Layout.fill}>
        <FastImage
          style={{
            width: '100%',
            height: 400,
          }}
          source={{
            uri: params.nftData?.imageURL,
          }}
        />
        <View style={[Common.container.base]}>
          <Spacing height={heightPercentage(20)} />
          <Text style={styles.contentHeading}>{`${params.nftData?.name}`}</Text>
          <Spacing height={heightPercentage(2)} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Images.profile width={19} height={19} stroke={'#888888'} />
            <View
              style={{
                flex: 1,
                marginLeft: widthPercentage(8),
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: '#888888',
                }}
              >
                membership
              </Text>
            </View>
          </View>
          <Spacing height={heightPercentage(20)} />
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#F1F1F1',
            }}
          />
        </View>
        <View>
          <Spacing height={heightPercentage(20)} />
          <Text style={[Common.container.base, styles.contentHeading]}>
            Assets
          </Text>
          <Spacing height={heightPercentage(8)} />
          <View style={{ paddingLeft: 19 }}>
            <FlatList
              data={assetsData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
            />
          </View>
          <Spacing height={heightPercentage(20)} />
        </View>
        <View style={[Common.container.base]}>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#F1F1F1',
            }}
          />
          <Spacing height={heightPercentage(20)} />
          <Text style={styles.contentHeading}>Description</Text>
          <Text style={styles.contentDescription}>
            {`${params.nftData.description}`}
          </Text>
          <Spacing height={heightPercentage(20)} />
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#F1F1F1',
            }}
          />
        </View>
        <View>
          <Spacing height={heightPercentage(20)} />
          <TouchableOpacity
            style={[
              Common.container.base,
              {
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}
            onPress={() => refetchAssets()}
          >
            <FastImage
              style={styles.profileIcon}
              source={{ uri: params?.creatorData?.profilePhoto }}
            />
            <View
              style={{
                flex: 1,
                marginLeft: 10,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  lineHeight: 25,
                  color: '#000000',
                }}
              >
                {`created by ${params?.creatorData?.userTag}`}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                  color: '#888888',
                  lineHeight: 15,
                }}
              >
                {params.nftData.creatorAddress
                  ? `${maskingName(params.nftData.creatorAddress)}`
                  : '--'}
              </Text>
            </View>
          </TouchableOpacity>
          <Spacing height={heightPercentage(14)} />
          <TouchableOpacity
            style={[
              Common.container.base,
              {
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}
            onPress={() => onPressProfile(params.ownerData)}
          >
            <Spacing width={widthPercentage(12)} />
            <Images.right width={10} height={16} />
            <Spacing width={widthPercentage(12)} />
            <FastImage
              style={styles.profileIcon}
              source={{ uri: params.ownerData.profilePhoto }}
            />
            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  lineHeight: 25,
                  color: '#000000',
                }}
              >
                {`owned by ${params.ownerData.userTag}`}
              </Text>
              <Text
                style={{ fontSize: 13, fontWeight: '500', color: '#888888' }}
              >
                {maskingName(params.nftData.ownerAddress)}
              </Text>
            </View>
          </TouchableOpacity>
          <Spacing height={heightPercentage(20)} />
        </View>
        <View style={[Common.container.base]}>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#F1F1F1',
            }}
          />
          <Spacing height={heightPercentage(20)} />
          <Text style={styles.contentHeading}>Details</Text>
          <Spacing height={heightPercentage(4)} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 24,
                color: '#808191',
              }}
            >
              Contract Address
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                lineHeight: 24,
                color: '#1B1D21',
              }}
            >
              {maskingName(params.nftData.collectionAddress)}
            </Text>
          </View>
          <Spacing height={heightPercentage(4)} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 24,
                color: '#808191',
              }}
            >
              Token ID
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                lineHeight: 24,
                color: '#1B1D21',
              }}
            >
              {params.nftData.tokenId}
            </Text>
          </View>
          <Spacing height={heightPercentage(4)} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 24,
                color: '#808191',
              }}
            >
              Chain
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                lineHeight: 24,
                color: '#1B1D21',
              }}
            >
              {params?.collectionData?.chain}
            </Text>
          </View>
          <Spacing height={heightPercentage(4)} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 24,
                color: '#808191',
              }}
            >
              Token Standard
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                lineHeight: 24,
                color: '#1B1D21',
              }}
            >
              {params?.collectionData?.standard}
            </Text>
          </View>
          <Spacing height={heightPercentage(38)} />
          <View
            style={{
              width: '100%',
            }}
          />
          {params.nftData.marketplaceURL && (
            <CTAButton
              onPress={onVisitMarket}
              label="Visit Marketplace"
              mode="contained"
              textColor="#FFFFFF"
              buttonColor="#00DF8F"
              style={styles.signInButton}
              labelStyle={styles.signInText}
              contentStyle={styles.signInContainerButton}
            />
          )}
          <Spacing height={heightPercentage(50)} />
        </View>
      </ScrollView>
    </View>
  )
}

export default ScannerDetail
