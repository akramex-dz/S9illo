import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FlatList } from "react-native";
import { useState, useRef, useEffect } from "react";
import plants from "../../data/plants";
import ProchainsArr from "../../data/PronchainsArr";
import ArrosageCard from "./ArrosageCard";
import COLORS from "../../data/colors";

export default function ProchainsArrosages() {
  const [currentPage, setCurrentPage] = useState(0);
  const [viewableItems, setViewableItems] = useState([]);
  const flatlistRef = useRef();

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    setViewableItems(viewableItems);
  });

  useEffect(() => {
    if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
    setCurrentPage(viewableItems[0].index);
  }, [viewableItems]);

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
            {[...Array(data.length)].map((_, index) => (
              <View
                key={index}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 5,
                  backgroundColor:
                    index == currentPage ? COLORS.GREEN : COLORS.GRAY + "20",
                  marginRight: 5,
                  top: 120,
                }}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <View
      style={{
        height: 264,
        width: 345,
        backgroundColor: "#EFEFEF",
        borderRadius: 15,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontFamily: "CircularStd-Bold",
          marginLeft: 20,
          marginTop: 15,
          color: "#00000070",
        }}
      >
        Derniers Arrosages
      </Text>
      <FlatList
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        data={ProchainsArr}
        style={{ showsVerticalScrollIndicator: false }}
        pagingEnabled={true}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        showsHorizontalScrollIndicator={false}
        ref={flatlistRef}
        renderItem={({ item, index }) => (
          <ArrosageCard
            name={item.name}
            img={item.img}
            id={item.id}
            time={item.time}
            water={item.water}
            date={item.date}
          />
        )}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
      />
      {renderBottomSection()}
    </View>
  );
}
