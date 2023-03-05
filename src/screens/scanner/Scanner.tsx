/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  NativeEventEmitter,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import Config from 'react-native-config'
import Lottie from 'lottie-react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { ScannerView } from '@/components/scanner/ScannerView'
import SkeletonContent from 'react-native-skeleton-content-nonexpo'
import { Spacing } from '@/components/Spacing'
import { fetchCollection } from '@/api/fetchCollection'
import { fetchNFTInfo } from '@/api/fetchNFTInfo'
import { fetchUser } from '@/api/fetchUser'
/* eslint-disable react-hooks/exhaustive-deps */
import getSize from '@/utils/getSize'
import { useStyle } from './style'
import { useTheme } from '@/hooks'
import { useTranslation } from 'react-i18next'

interface receiveDataProps {
  actionType: string
  contentType: string
  displayOrientation: string
  dotDesc: string
  dotId: string
  dotSeq: number
  dotSubTitle: string
  dotTitle: string
  fileConnectUri: string
  odroidSignalYn: string
  projectNm: string
  qrString: string
  readYn: string
  recogType: string
  sampleImgPath: string
  serviceTarget: string
  usePasswdYn: string
}

const Scanner = () => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const { Common, Layout, Images } = useTheme()
  const modalizeRef = useRef<Modalize>(null)
  const { RNEventEmitter, RNScannerView, NativeMobileSDKBridge } = NativeModules
  const eventEmitter = new NativeEventEmitter(RNEventEmitter)
  const [receiveData, setReceiveData] = useState<receiveDataProps | undefined>()
  const [isFlashOn, setIsFlashOn] = useState(false)
  const [isZoomOn, setIsZoomOn] = useState(false)
  const [isLoadingVisible, setIsLoadingVisible] = useState(false)
  const { heightPercentage, widthPercentage } = getSize()

  const [dotId, setDotId] = useState<string>('')
  const [collectionId, setCollectionId] = useState<string>('')

  const {
    data: nftData,
    isLoading,
    isSuccess,
  } = useQuery(['nft-info', dotId], () => fetchNFTInfo(dotId), {
    enabled: !!dotId,
  })

  const { data: collectionData, isLoading: isCollectionLoading } = useQuery(
    ['nft-info', collectionId],
    () => fetchCollection(collectionId),
    {
      enabled: !!collectionId,
    },
  )

  const { data: creatorData, isLoading: isCreatorLoading } = useQuery(
    ['user-info', collectionData?.chain],
    async () =>
      collectionData &&
      nftData &&
      fetchUser({
        address: nftData?.creatorAddress,
        chain: collectionData?.chain,
      }),
    {
      enabled: !!collectionData?.chain,
    },
  )

  const { data: ownerData, isLoading: isOwnerLoading } = useQuery(
    ['user-info', collectionData?.chain],
    async () =>
      collectionData &&
      nftData &&
      fetchUser({
        address: nftData?.ownerAddress,
        chain: collectionData?.chain,
      }),
    {
      enabled: !!collectionData?.chain,
    },
  )

  useEffect(() => {
    const onScanSubscription = eventEmitter.addListener('onFinished', res => {
      if (Platform.OS === 'ios') {
        const obj = JSON.parse(res)
        setReceiveData(obj)
      } else {
        setReceiveData(res)
      }
    })

    return () => {
      onScanSubscription.remove()
    }
  }, [])

  useEffect(() => {
    const onScanSubscription = eventEmitter.addListener('onLoading', res => {
      if (Platform.OS === 'ios') {
        const obj = JSON.parse(res)
        if (obj) {
          setIsLoadingVisible(obj)
        }
      } else {
      }
    })

    return () => {
      onScanSubscription.remove()
    }
  }, [])

  useEffect(() => {
    if (isLoading && Platform.OS === 'android') {
      setIsLoadingVisible(true)
    }
  }, [isLoading])

  useEffect(() => {
    if (isSuccess) {
      setIsLoadingVisible(false)
      modalizeRef.current?.open()
      nftData?.collectionId && setCollectionId(nftData?.collectionId)
    }
  }, [isSuccess])

  useEffect(() => {
    if (receiveData) {
      console.log('receiveData?.dotIdreceiveData?.dotId', receiveData?.dotId)
      setDotId(receiveData?.dotId)
    }
  }, [receiveData])

  const onClickFlash = () => {
    setIsFlashOn(!isFlashOn)
    if (Platform.OS === 'ios') {
      RNScannerView.setFlashOn(!isFlashOn)
    } else {
      NativeMobileSDKBridge.setFlashOn(!isFlashOn)
    }
  }

  const onClickZoom = () => {
    setIsZoomOn(!isZoomOn)
    if (Platform.OS === 'ios') {
      RNScannerView.setZoomOn(!isZoomOn)
    } else {
      NativeMobileSDKBridge.setZoomOn(!isZoomOn)
    }
  }

  const onCloseModal = () => {
    setDotId('')
    setCollectionId('')
    if (Platform.OS === 'ios') {
      RNScannerView.initCamera()
    } else {
      NativeMobileSDKBridge.initCamera()
    }
    setTimeout(function () {
      if (Platform.OS === 'ios') {
        RNScannerView.setFlashOn(isFlashOn)
        RNScannerView.setZoomOn(isZoomOn)
      } else {
        NativeMobileSDKBridge.setFlashOn(isFlashOn)
        NativeMobileSDKBridge.setZoomOn(isZoomOn)
      }
    }, 500)
  }

  const maskingName = (strName: string) => {
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

  const skeletonView = () => (
    <View style={styles.content}>
      <View style={[Common.container.base, { flexDirection: 'row' }]}>
        <Image style={styles.tinyLogo} source={{ uri: nftData?.imageURL }} />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.contentHeading}>{`${nftData?.name}`}</Text>
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
          <Spacing height={heightPercentage(16)} />
          <Text style={styles.contentDescription} numberOfLines={4}>
            {`${nftData?.description}`}
          </Text>
        </View>
      </View>
      <View style={styles.contentLine} />
      <View>
        <View
          style={[
            Common.container.base,
            {
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}
        >
          <SkeletonContent
            containerStyle={styles.profileIcon}
            isLoading={isCreatorLoading}
            layout={[
              {
                key: 'someId',
                width: 48,
                height: 48,
                borderRadius: 48 / 2,
              },
            ]}
          >
            <Image
              style={styles.profileIcon}
              source={{ uri: creatorData?.profilePhoto }}
            />
          </SkeletonContent>
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              justifyContent: 'center',
            }}
          >
            <SkeletonContent
              containerStyle={{
                flex: 1,
                justifyContent: 'center',
              }}
              isLoading={isCreatorLoading}
              layout={[
                {
                  key: 'someId',
                  width: 200,
                  height: 25,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  lineHeight: 25,
                  color: '#000000',
                }}
              >
                {`created by ${creatorData?.userTag}`}
              </Text>
            </SkeletonContent>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '500',
                color: '#888888',
                lineHeight: 15,
              }}
            >
              {`${nftData && maskingName(nftData?.ownerAddress)}`}
            </Text>
          </View>
        </View>
        <Spacing height={heightPercentage(14)} />
        <View
          style={[
            Common.container.base,
            { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
          ]}
        >
          <Spacing width={widthPercentage(12)} />
          <Images.right width={10} height={16} />
          <Spacing width={widthPercentage(12)} />
          <SkeletonContent
            containerStyle={styles.profileIcon}
            isLoading={isOwnerLoading}
            layout={[
              {
                key: 'someId',
                width: 48,
                height: 48,
                borderRadius: 48 / 2,
              },
            ]}
          >
            <Image
              style={styles.profileIcon}
              source={{ uri: ownerData?.profilePhoto }}
            />
          </SkeletonContent>
          <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }}>
            <SkeletonContent
              containerStyle={{
                flex: 1,
                justifyContent: 'center',
              }}
              isLoading={isOwnerLoading}
              layout={[
                {
                  key: 'someId',
                  width: 200,
                  height: 25,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  lineHeight: 25,
                  color: '#000000',
                }}
              >
                {`owned by ${ownerData?.userTag}`}
              </Text>
            </SkeletonContent>

            <Text style={{ fontSize: 13, fontWeight: '500', color: '#888888' }}>
              {`${nftData && maskingName(nftData?.ownerAddress)}`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <View style={Layout.fill}>
      <ScannerView style={Layout.fill} />
      {isLoadingVisible && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
          }}
        >
          <Lottie
            source={require('@/assets/animations/loading.json')}
            autoPlay
            loop
          />
        </View>
      )}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={require('@/assets/images/cameraFocus.png')}
        />
      </View>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          alignItems: 'flex-end',
          marginRight: 10,
        }}
      >
        <View
          style={{
            marginTop: 60,
            backgroundColor: 'rgba(49, 49, 49, 0.8)',
            width: 50,
            height: 98,
            borderRadius: 34,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 9,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 7,
            }}
            onPress={onClickFlash}
          >
            {isFlashOn ? (
              <Images.zap width={25} height={25} stroke={'#FFFFFF'} />
            ) : (
              <Images.zap
                width={25}
                height={25}
                opacity={0.2}
                stroke={'#FFFFFF'}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 7,
            }}
            onPress={onClickZoom}
          >
            {isZoomOn ? (
              <Images.zoom width={25} height={25} stroke={'#FFFFFF'} />
            ) : (
              <Images.zoom
                width={25}
                height={25}
                opacity={0.2}
                stroke={'#FFFFFF'}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Portal>
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight={true}
          onClose={() => onCloseModal()}
        >
          {skeletonView()}
        </Modalize>
      </Portal>
    </View>
  )
}

export default Scanner
