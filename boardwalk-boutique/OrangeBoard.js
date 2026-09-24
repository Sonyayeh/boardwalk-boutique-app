import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Logo from "./assets/skateboards/logo.png";
import Map from "./assets/skateboards/map.png";
import OrangeBoard from "./assets/skateboards/orangeskateboard.png";
import PinkBoard from "./assets/skateboards/pinkboard.png"
import PompomBoard from "./assets/skateboards/pompomboard.png";
import BlueBoard from "./assets/skateboards/blueboard.png";

const BLUE = "#C8D4EE";
const DARK = "#12345C";
const WHITE = "#FFFFFF";

const THIS_ITEM = {
  name: "Girl\nSkateboard",
  type: "Standard",
  price: "$4.00/hr",
  image: OrangeBoard,
};

function StarRating({ rating, reviewCount }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.ratingRow}>
      {stars.map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? "star" : "star-outline"}
          size={16}
          color="#F5B400"
          style={styles.star}
        />
      ))}

      <View style={styles.reviewBadge}>
        <Text style={styles.reviewCount}>{reviewCount}</Text>
      </View>
    </View>
  );
}

const recommendedBoards = [
  {
    name: "Girl\nSkateboards",
    price: "$4.00/hr",
    image: OrangeBoard,
  },
  {
    name: "Girl\nSkateboards",
    price: "$5.00/hr",
    image: PompomBoard,
  },
  {
    name: "Dustin\nHenry",
    price: "$6.00/hr",
    image: BlueBoard,
  },
];

function RecommendedCard({ item, likedItems, addLikeItem, removeLikeItem, showLikePopup, showRemovePopup }) {
  const [liked, setLiked] = useState(false);

  const handleLikeItem = () => {
  if (liked) {
    if (removeLikeItem) removeLikeItem({ type: "Standard" });
    if (showRemovePopup) showRemovePopup();
  } else {
    if (addLikeItem) {
      addLikeItem({
        name: "Girl\nSkateboard",
        type: "Standard",
        price: "$4.00/hr",
        image: OrangeBoard,
      });
    }
    if (showLikePopup) showLikePopup();
  }
  setLiked(!liked);
};

  return (
    <View style={styles.carouselCard}>
      <Image source={item.image} style={styles.carouselImage} resizeMode="contain" />
      <View style={styles.icons}>
        <TouchableOpacity onPress={handleLikeItem}>
          <Ionicons name={liked ? "heart" : "heart-outline"} size={18} color={liked ? "red" : "black"} />
        </TouchableOpacity>
        <Ionicons name="cart-outline" size={20} color="black" />
      </View>
      <Text style={styles.carouselName}>{item.name}</Text>
      <Text style={styles.carouselPrice}>{item.price}</Text>
    </View>
  );
}

export default function Orange({
  setPage, addRentalItem, rentalCart, goBack, likedItems,
  addLikeItem, removeLikeItem, showLikePopup, showRemovePopup,
  likeFadeAnim, removeFadeAnim,
}) {
  const outerScrollRef = useRef(null);
  const totalLiked = likedItems.reduce((sum, item) => sum + item.quantity, 0);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const totalItems = rentalCart.reduce((sum, item) => sum + item.quantity, 0);

  const liked = likedItems.some((i) => i.name === THIS_ITEM.name);

  const handleLikeItem = () => {
    if (liked) {
      if (removeLikeItem) removeLikeItem(THIS_ITEM);
      if (showRemovePopup) showRemovePopup();
    } else {
      if (addLikeItem) addLikeItem(THIS_ITEM);
      if (showLikePopup) showLikePopup();
    }
  };

  const showCartPopup = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.delay(1200),
      Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.screen}>
        <ScrollView ref={outerScrollRef} contentContainerStyle={styles.scroll} nestedScrollEnabled={true}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={goBack}
            >
              <Ionicons name="chevron-back" size={34} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setPage("home")}>
              <Image source={Logo} style={styles.logo} resizeMode="contain" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton}>
              <Ionicons name="menu" size={28} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailCard}>
            <Image
              source={OrangeBoard}
              style={styles.boardImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>
            Girl Skateboards
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>$4.00/hr</Text>
            <StarRating rating={4} reviewCount={352} />
          </View>

          <TouchableOpacity
            style={styles.book}
            onPress={() => {
              addRentalItem({
                name: "Girl\nSkateboard",
                type: "Standard",
                price: "$4.00/hr",
                image: OrangeBoard,
              });
              showCartPopup();
            }}
          >
            <Text style={styles.booktext}>Book Now</Text>
            <View style={styles.icon}>
              <Ionicons name="cart-outline" size={30} color="white" />
            </View>
            <TouchableOpacity onPress={handleLikeItem}>
              <View style={styles.heart}>
                <Ionicons
                  name={liked ? "heart" : "heart-outline"}
                  size={30}
                  color={liked ? "red" : "black"}
                />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>
              Description:
            </Text>
            <Text style={styles.description}>
              bright coral/red deck, with a teal rectangular graphic in the center featuring the brand's signature bathroom-icon logo.
            </Text>
            <Text style={styles.description}>
              It creates a clean, high-contrast design that's one of Girl's most classic and recognizable deck styles, often released in different colorways per pro rider.
            </Text>
          </View>
          <View>
            <Text style={styles.title}>
              Information:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>• 7-ply maple, standard popsicle shape, medium concave, G008-style shape family</Text>
              <Text style={styles.listItem}>•Red/black (sometimes listed as "Girl Malto 93 Til Black and Red")</Text>
              <Text style={styles.listItem}>• "93 Til" (a recurring graphic series featuring Girl's signature bathroom-icon logo, refreshed with new colorways each season)</Text>
            </View>
            <Text style={styles.title}>
              Available Location:
            </Text>
            <View style={styles.location}>
              <View style={styles.locationColumn}>
                <Text style={styles.locationText}>
                  872 Seymour Street, Vancouver, British Columbia V6B 3L5, Canada
                </Text>

                <Text style={styles.mapText}>Open in Maps</Text>
              </View>

              <Image source={Map} style={styles.mapImage} resizeMode="contain" />
            </View>
            <View>
              <Text style={styles.reviewHeader}>
                Reviews:
              </Text>
              {/* each review card is this big */}
              <View style={styles.reviewCard}>
                <View style={styles.reviewStars}>
                  <Ionicons name="star" size={16} color="#F5B400" />
                  <Ionicons name="star" size={16} color="#F5B400" />
                  <Ionicons name="star" size={16} color="#F5B400" />
                  <Ionicons name="star" size={16} color="#F5B400" />
                  <Ionicons name="star" size={16} color="#F5B400" />
                  <Text style={styles.reviewName}>Karleil V</Text>
                </View>
                <Text style={styles.reviewText}>
                  I brought my cousins to skateboard and she chose this board. The staffs were super nice to adjust the wheels for us and recommended us some gears.
                </Text>
              </View>

              <View style={styles.reviewCard}>
                <View style={styles.reviewStars}>
                  <Ionicons name="star" size={16} color="#F5B400" />
                  <Ionicons name="star" size={16} color="#F5B400" />
                  <Ionicons name="star" size={16} color="#F5B400" />
                  <Ionicons name="star" size={16} color="#F5B400" />
                  <Ionicons name="star" size={16} color="#F5B400" />
                  <Text style={styles.reviewName}>Sonya Y</Text>
                </View>
                <Text style={styles.reviewText}>
                  I didn't remember how to skateboard anymore and was worried I may fall easily. Luckily, the staffs recommended me this board because it was beginner friendly. I did fall a few times, but overall I enjoyed it.
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => setPage("Review")}>
                  <Text style={styles.seeMoreReviews}>See more reviews</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.title}>
                  Recommended for You:
                </Text>
                <ScrollView
                  horizontal
                  style={{ width: "100%" }}
                  contentContainerStyle={styles.carousel}
                  showsHorizontalScrollIndicator={false}
                  simultaneousHandlers={outerScrollRef}
                >
                  {recommendedBoards.map((item, index) => (
                    <RecommendedCard
                      key={index}
                      item={item}
                      likedItems={likedItems}
                      addLikeItem={addLikeItem}
                      removeLikeItem={removeLikeItem}
                      showLikePopup={showLikePopup}
                      showRemovePopup={showRemovePopup}
                    />
                  ))}
                </ScrollView>
              </View>
              <View>
                <Text style={styles.title}>
                  Similar Items:
                </Text>
                <ScrollView
                  horizontal
                  style={{ width: "100%" }}
                  contentContainerStyle={styles.carousel}
                  showsHorizontalScrollIndicator={false}
                  simultaneousHandlers={outerScrollRef}
                >
                  {recommendedBoards.map((item, index) => (
                    <RecommendedCard
                      key={index}
                      item={item}
                      likedItems={likedItems}
                      addLikeItem={addLikeItem}
                      removeLikeItem={removeLikeItem}
                      showLikePopup={showLikePopup}
                      showRemovePopup={showRemovePopup}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.screenPopup,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <View style={styles.popupBox}>
          <Text style={styles.centerPopupText}>Item added to cart!</Text>
        </View>
      </Animated.View>

      {/* added to favourites popup */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.screenPopup,
          {
            opacity: likeFadeAnim,
          },
        ]}
      >
        <View style={styles.popupBox}>
          <Text style={styles.centerPopupText}>Added to Favourites!</Text>
        </View>
      </Animated.View>

      {/* removed from favourites popup */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.screenPopup,
          {
            opacity: removeFadeAnim,
          },
        ]}
      >
        <View style={styles.popupBox}>
          <Text style={styles.centerPopupText}>Removed from Favourites.</Text>
        </View>
      </Animated.View>

      <View style={styles.bottomNav}>
        {/* the home button */}
        <TouchableOpacity onPress={() => setPage("home")}>
          <Ionicons name="home-outline" size={24} />
        </TouchableOpacity>
        {/* the shopping cart */}
        <TouchableOpacity onPress={() => setPage("rentalInfo")}>
          <Ionicons name="cart-outline" size={24} />
          {totalItems > 0 && (
            <View style={styles.bottomCartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
        {/* go to the recommendation page */}
        <TouchableOpacity onPress={() => setPage("recommendation")}>
          <Ionicons name="add-circle-outline" size={24} />
        </TouchableOpacity>
        {/* going to liked page */}
        <TouchableOpacity onPress={() => setPage("Favourite")}>
          <Ionicons name="heart-outline" size={24} />
          {totalLiked > 0 && (
            <View style={styles.bottomLikeBadge}>
              <Text style={styles.LikeBadgeText}>{totalLiked}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BLUE,
  },

  scroll: {
    paddingBottom: 70,
  },

  header: {
    height: 110,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },

  backButton: {
    position: "absolute",
    left: 24,
    top: 30,
  },

  menuButton: {
    position: "absolute",
    right: 24,
    top: 30,
  },

  logo: {
    width: 170,
    height: 80,
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    height: 55,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  title: {
    fontSize: 23,
    color: DARK,
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "left",
    marginVertical: 24,
    paddingLeft: 20,
  },

  screenPopup: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  popupBox: {
    backgroundColor: "rgba(70,70,70,0.92)",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
  },

  centerPopupText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  bottomCartBadge: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "red",
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },

  cartBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },

  description: {
    fontSize: 13,
    color: DARK,
    paddingHorizontal: 24,
    paddingBottom: 10,
  },

  detailCard: {
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },

  boardImage: {
    width: 160,
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 8,
  },

  reviewHeader: {
    fontSize: 28,
    color: DARK,
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "center",
    paddingHorizontal: 24,
    marginVertical: 18,
    paddingTop: 10,
  },

  price: {
    fontSize: 18,
    color: DARK,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 15,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  star: {
    marginRight: 1,
  },

  reviewBadge: {
    backgroundColor: "#E6E6E6",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },

  reviewCount: {
    fontSize: 12,
    color: DARK,
  },

book: {
  backgroundColor: DARK,
  width: "75%",
  borderRadius: 8,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 10,
  paddingVertical: 8,
},
  heart: {
    paddingHorizontal: 24,
    marginTop: 12,
  },

  bottomLikeBadge: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "red",
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },

  LikeBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
booktext: {
    fontSize: 20,
    color: WHITE,
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "left",
    paddingHorizontal: 4,
    marginVertical: 10,
    width: 250,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 70,
  },

  list: {
    paddingHorizontal: 24,
    marginBottom: 10,
  },

  listItem: {
    fontSize: 13,
    color: DARK,
    marginBottom: 6,
    lineHeight: 18,
  },

  location: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },

  locationText: {
    fontSize: 13,
    color: DARK,
    width: 150,
  },

  locationColumn: {
    flexDirection: "column",
  },

  mapText: {
    fontSize: 13,
    color: DARK,
    textDecorationLine: "underline",
    marginTop: 20,
    paddingLeft: 10,
  },

  mapImage: {
    width: 140,
    height: 110,
    borderRadius: 8,
    marginRight: 15,
  },

  reviewCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#8EA7DC",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    width: "90%",
    alignSelf: "center",
  },

  reviewStars: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  reviewName: {
    marginLeft: 6,
    fontSize: 14,
    color: DARK,
  },

  reviewText: {
    fontSize: 12,
    color: DARK,
    textAlign: "left",
    lineHeight: 18,
  },

  seeMoreReviews: {
    fontSize: 14,
    textDecorationLine: "underline",
    color: DARK,
    textAlign: "center",
    marginBottom: 20,
  },

  carousel: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 16,
  },

  carouselCard: {
    alignItems: "center",
    width: 140,
  },

  carouselImage: {
    width: 90,
    height: 170,
  },

  carouselIcons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
  },

  carouselName: {
    marginTop: 8,
    fontSize: 15,
    color: DARK,
    textAlign: "center",
    fontFamily: "serif",
  },

  carouselPrice: {
    marginTop: 4,
    fontSize: 14,
    color: DARK,
    textAlign: "center",
  },
});