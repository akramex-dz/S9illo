import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import COLORS from "../../data/colors";
import data from "../../data/OnboardingData";

const Onboarding = ({ navigation }) => {
  const flatlistRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [viewableItems, setViewableItems] = useState([]);

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    setViewableItems(viewableItems);
  });

  useEffect(() => {
    if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
    setCurrentPage(viewableItems[0].index);
  }, [viewableItems]);

  const handleNext = () => {
    if (currentPage == data.length - 1) return;

    flatlistRef.current.scrollToIndex({
      animated: true,
      index: currentPage + 1,
    });
  };

  const handleSkipToEnd = () => {
    flatlistRef.current.scrollToIndex({
      animate: true,
      index: data.length - 1,
    });
  };

  const navigateLogin = () => {
    navigation.replace("Login");
  };

  const renderTopSection = () => {
    return (
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10 * 2,
          }}
        >
          {/* Back button */}
          {/* <TouchableOpacity
            onPress={handleBack}
            style={{
              padding: 10,
            }}
          > */}
          {/* Back icon */}
          {/* Hide back button on 1st screen */}
          {/* </TouchableOpacity> */}

          {/* Skip button */}
          {/* Hide Skip button on last screen */}
          {/* <TouchableOpacity onPress={handleSkipToEnd}>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.black,
                opacity: currentPage == data.length - 1 ? 0 : 1,
              }}
            >
              Skip
            </Text>
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>
    );
  };

  const renderBottomSection = () => {
    return (
      <SafeAreaView>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10 * 2,
            paddingVertical: 10 * 2,
          }}
        >
          {/* Pagination */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              bottom: "40%",
            }}
          >
            {
              // No. of dots
              [...Array(data.length)].map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 5,
                    backgroundColor:
                      index == currentPage ? COLORS.GRAY : COLORS.GRAY + "20",
                    marginRight: 5,
                  }}
                />
              ))
            }
          </View>

          {/* Next or GetStarted button */}
          {/* Show or Hide Next button & GetStarted button by screen */}

          {currentPage != data.length - 1 ? (
            <TouchableOpacity
              onPress={handleNext}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: 250,
                height: 50,
                borderRadius: 15,
                backgroundColor: COLORS.GRAY,
                opacity: 0.8,
              }}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  // fontFamily: "CircularStd",
                  fontWeight: "700",
                  fontSize: 16,
                  color: "#00000090",
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: 250,
                height: 50,
                paddingHorizontal: 10 * 2,
                borderRadius: 15,
                backgroundColor: COLORS.GREEN,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={navigateLogin}
            >
              <Text
                style={{
                  color: "#fff",
                  // fontFamily: "Circular Std",
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                GO !
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const renderFlatlistItem = ({ item }) => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginVertical: 10 * 2,
          }}
        >
          <Image
            source={item.img}
            style={{ width: 215, height: 215 }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10 * 4,
          }}
        >
          <Text
            style={{
              fontSize: 34,
              textAlign: "center",
              fontWeight: "700",
              color: "#7B7B7B",
              fontFamily: "CircularStd",
              lineHeight: 43,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              marginTop: 7,
              lineHeight: 28,
              color: COLORS.GRAY,
              fontWeight: "700",
            }}
          >
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.GRAY} />

      {/* TOP SECTION - Back & Skip button */}
      {renderTopSection()}

      {/* FLATLIST with pages */}
      <FlatList
        data={data}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={renderFlatlistItem}
        ref={flatlistRef}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        initialNumToRender={1}
      // extraData={Dimensions.get("window").width}
      />
      {/* BOTTOM SECTION - pagination & next or GetStarted button */}
      {renderBottomSection()}
    </View>
  );
};

export default Onboarding;
