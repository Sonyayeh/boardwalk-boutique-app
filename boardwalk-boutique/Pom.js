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
import PinkBoard from "./assets/skateboards/pinkboard.png";
import Map from "./assets/skateboards/map.png";
import OrangeBoard from "./assets/skateboards/orangeskateboard.png";
import PompomBoard from "./assets/skateboards/pompomboard.png";
import BlueBoard from "./assets/skateboards/blueboard.png";
import Socks from "./assets/skateboards/socks.png"
import Tshirt from "./assets/skateboards/tshirt.png"


const BLUE = "#C8D4EE";
const DARK = "#12345C";
const WHITE = "#FFFFFF";

export default function Pompom({ setPage, addRentalItem, rentalCart, goBack }) {
  const outerScrollRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const totalItems = rentalCart.reduce((sum, item) => sum + item.quantity, 0); 

  const showCartPopup = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(1200),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
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
    name: "Thrasher",
    type: "Goat Socks",
    price: "$15.00",
    image: Socks,
  },
  {
    name: "Bronze",
    type: "Ranch Tee Navy",
    price: "$34.00",
    image: Tshirt,
  },
];

function RecommendedCard({ item }) {
  const [rentalCart, setRentalCart] = useState([]);
  return (
    <View style={styles.carouselCard}>
      <Image
        source={item.image}
        style={styles.carouselImage}
        resizeMode="contain"
      />

      <View style={styles.carouselIcons}>
        <Ionicons name="heart-outline" size={20} color="black" />
        <Ionicons name="cart-outline" size={20} color="black" />
      </View>

      <Text style={styles.carouselName}>{item.name}</Text>
      <Text style={styles.carouselPrice}>{item.price}</Text>
    </View>
  );
}

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
            source={PompomBoard}
            style={styles.boardImage}
            resizeMode="contain"
          />

        </View>
          <Text style={styles.title}>
            Girl Skateboards 
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>$5.00/hr</Text>
            <StarRating rating={4} reviewCount={352} />
          </View>
             <TouchableOpacity
              style={styles.book}
              onPress={() => {
              addRentalItem({
                name: "Girl\nSkateboard",
                type: "PomPomPurin",
                price: "$5.00/hr",
                image: PompomBoard,
              });
              showCartPopup();
            }}
            >
           <Text style={styles.booktext}>Book Now</Text>
            <View style={styles.icon}>
              <Ionicons name="cart-outline" size={30} color="white" />
            </View>
              <TouchableOpacity onPress={() => setLiked(!liked)}>
                <View style={styles.heart}>
                  <Ionicons name="heart-outline" size={30} 
                  name={liked ? "heart" : "heart-outline"}
                  color={liked ? "red" : "black"}/>
            </View>
              </TouchableOpacity>
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>
                        Description:
                    </Text>
                    <Text style={styles.description}>
                        This teal deck comes from Girl Skateboards' collaboration with Sanrio, featuring Pompompurin front and center in a playful, colorful graphic. Built on Griffin Gass's signature pro-model shape, the deck has a full round nose and tail with standard maple construction, giving it a smooth, well-balanced ride.
                    </Text>
                    <Text style={styles.description}>
                           Equal parts skate-ready and display-worthy, it's a fun pick for riders who want their board to have a little personality.
                    </Text>
                </View>
            <View>
                <Text style={styles.title}>
                Information:
                </Text>
                <View style={styles.list}>
                <Text style={styles.listItem}>• An exclusive Sanrio collaboration.</Text>
                <Text style={styles.listItem}>• A full round nose, full hips, and round blunted tail, measuring 8.5" x 32" with a 14.4375 wheelbase.</Text>
                <Text style={styles.listItem}>• Signature pro-model deck design for professional skateboarder Griffin Gass</Text>
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
                        <Text style={styles.reviewName}>Maya R</Text>
                    </View>
                    <Text style={styles.reviewText}>
                         I am a skateboard beginner and a Sanrio fan. I was immediately drawn to this board mainly because of the graphics. It somehow also went well with my outfit that day!
                    </Text>
                    </View>
                    
                    <View style={styles.reviewCard}>
                    <View style={styles.reviewStars}>
                        <Ionicons name="star" size={16} color="#F5B400" />
                        <Ionicons name="star" size={16} color="#F5B400" />
                        <Ionicons name="star" size={16} color="#F5B400" />
                        <Ionicons name="star" size={16} color="#F5B400" />
                        <Ionicons name="star" size={16} color="#F5B400" />
                        <Text style={styles.reviewName}>Vahan G</Text>
                    </View>
                    <Text style={styles.reviewText}>
                        They said I could get 10% off if I leave a review.
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
                            <RecommendedCard key={index} item={item} />
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
                            <RecommendedCard key={index} item={item} />
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

       <View style={styles.bottomNav}>
                     {/* the home button */}
                     <TouchableOpacity onPress={() => setPage("home")} >
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
                       <TouchableOpacity onPress={() => setPage("Favourite")} >
                               <Ionicons name="heart-outline" size={24} />
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

  description:{
    fontSize: 13,
    color: DARK,
    paddingHorizontal: 24,
    paddingBottom: 10
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
    width: "60%",
    borderRadius: 8,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  heart: {
    paddingHorizontal: 6,
    marginTop: 12,
  },
  
  booktext: {
    fontSize: 20,
    color: WHITE,
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "left",
    paddingHorizontal: 4,
    marginVertical: 10,
  },

  icon: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 8,
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

seeMoreReviews :{
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