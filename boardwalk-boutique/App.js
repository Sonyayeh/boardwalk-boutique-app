import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Recommendation from "./Recommendation";
import Shop from "./Shop";
import RentalInfo from "./RentalInfo";
import Fa from "./Fa";
import Orange from "./OrangeBoard";
import Pompom from "./Pom";
import Review from "./Review";
import Favourite from "./Favourite";

import BlueBoard from "./assets/skateboards/blueboard.png";
import PinkBoard from "./assets/skateboards/pinkboard.png";
import OrangeBoard from "./assets/skateboards/orangeskateboard.png";
import PompomBoard from "./assets/skateboards/pompomboard.png";

import Helmet from "./assets/skateboards/helmet.png";
import Socks from "./assets/skateboards/socks.png";
import Tshirt from "./assets/skateboards/tshirt.png";

import AboutUs from "./assets/skateboards/aboutus.png";
import Banner from "./assets/skateboards/banner.png";
import Logo from "./assets/skateboards/logo.png";


const BLUE = "#C8D4EE";
const DARK = "#12345C";
const WHITE = "#FFFFFF";
const BUTTON_BLUE = "#8EA7DC";

const brands = [
  "Santa Cruz",
  "Anti Hero",
  "Enjoi",
  "Baker",
  "Powell\nPeralta",
  "Toy Machine",
  "Birdhouse",
  "Girl\nSkateboards",
  "Deathwish",
];

const rentalItems = [
   {
      name: "FA",
      type: "Deck Store Collage",
      price: "$15.00/hr",
      image: PinkBoard,
    },
  {
    name: "Girl Skateboards",
    type: "Rickk Howard",
    price: "$5.00/hr",
    image: PompomBoard,
  },
  {
    name: "Dustin Henry",
    type: "1995 Graphic",
    price: "$6.00/hr",
    image: BlueBoard,
  },
];

const shopItems = [
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
  {
    name: "TSG",
    type: "Evolution Helmet",
    price: "$85.99",
    image: Helmet,
  },
];

function ProductCard({ item, shop, showCartPopup, addRentalItem, showLikePopup, showRemovePopup, addLikeItem, removeLikeItem, setPage }) {
  const [liked, setLiked] = useState(false);

  const handleAddToCart = () => {
    if (addRentalItem) addRentalItem(item);
    showCartPopup();
  };
  
  const handleLikeItem = () => {
    if (liked) {
      if (removeLikeItem) removeLikeItem(item);
      if (showRemovePopup) showRemovePopup();
    } else {
      if (addLikeItem) addLikeItem(item);
      if (showLikePopup) showLikePopup();
    }
    setLiked(!liked);
  };
  const handleCardPress = () => {
    if (item.image === PinkBoard) {
      setPage("Fa");
    }

    if (item.image === OrangeBoard) {
      setPage("Orange");
    }

    if (item.image === PompomBoard) {
      setPage("Pom");
    }

    if (item.name === "Review") {
      setPage("Review");
    }
    if (item.name === "Favourite") {
      setPage("Favourite");
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={[PinkBoard, OrangeBoard, PompomBoard].includes(item.image) ? 0.7 : 1}
      onPress={handleCardPress}
    >
      <View style={shop ? styles.shopImage : styles.boardImage}>
        <Image
          source={item.image}
          style={shop ? styles.realShopItem : styles.realBoard}
          resizeMode="contain"
        />

        <View style={styles.icons}>
          <TouchableOpacity onPress={handleLikeItem}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={18}
              color={liked ? "red" : "black"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleAddToCart}>
            <Ionicons name="cart-outline" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productType}>{item.type}</Text>
      <Text style={styles.price}>{item.price}</Text>

      {!shop && <Text style={styles.details}>View Details</Text>}
    </TouchableOpacity>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [history, setHistory] = useState([]);
  const navigate = (nextPage) => {
    setHistory((prev) => [...prev, page]);
    setPage(nextPage);
  };
  const goBack = () => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const newHistory = [...prev];
      const last = newHistory.pop();
      setPage(last);
      return newHistory;
    });
  };
  const [rentalCart, setRentalCart] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const totalItems = rentalCart.reduce((sum, item) => sum + item.quantity, 0);   
  const totalLiked = likedItems.reduce((sum, item) => sum + item.quantity, 0);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const likeFadeAnim = useState(new Animated.Value(0))[0];
  const removeFadeAnim = useState(new Animated.Value(0))[0];


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

   const showLikePopup = () => {
    Animated.sequence([
      Animated.timing(likeFadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.delay(1200),
      Animated.timing(likeFadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start();
  };

  const showRemovePopup = () => {
  Animated.sequence([
    Animated.timing(removeFadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
    Animated.delay(1200),
    Animated.timing(removeFadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
  ]).start();
};

  const addLikeItem = (item) => {
  setLikedItems((prev) => {
    const existingItem = prev.find((likedItem) => likedItem.type === item.type);
    if (existingItem) {
      return prev.map((likedItem) =>
        likedItem.type === item.type
          ? { ...likedItem, quantity: likedItem.quantity + 1 }
          : likedItem
      );
    }
    return [...prev, { ...item, quantity: 1 }];
  });
};

const removeLikeItem = (item) => {
  setLikedItems((prev) => prev.filter((likedItem) => likedItem.type !== item.type));
};

 const addRentalItem = (item) => {
  setRentalCart((prev) => {
    const existingItem = prev.find(
      (cartItem) => cartItem.type === item.type
    );

    if (existingItem) {
      return prev.map((cartItem) =>
        cartItem.type === item.type
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem
      );
    }

    return [...prev, { ...item, quantity: 1 }];
  });
};

const increaseItem = (itemType) => {
  setRentalCart((prev) =>
    prev.map((item) =>
      item.type === itemType
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseItem = (itemType) => {
  setRentalCart((prev) =>
    prev
      .map((item) =>
        item.type === itemType
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const deleteItem = (itemType) => {
  setRentalCart((prev) =>
    prev.filter((item) => item.type !== itemType)
  );
};



const decreaseLikedItem = (itemType) => {
  setLikedItems((prev) =>
    prev
      .map((item) =>
        item.type === itemType
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const deleteLikedItem = (itemType) => {
  setLikedItems((prev) =>
    prev.filter((item) => item.type !== itemType)
  );
};

const [email, setEmail] = useState("");

const handleSubscribe = () => {
  // hook this up to whatever backend/service you're using later
  console.log("Subscribed:", email);
  setEmail("");
};

if (page === "rentalInfo") {
  return (
    <RentalInfo
      setPage={navigate}
      goBack={goBack}
      rentalCart={rentalCart}
      likedItems={likedItems}
      addLikeItem={addLikeItem}
      showLikePopup={showLikePopup}
      increaseItem={increaseItem}
      decreaseItem={decreaseItem}
      deleteItem={deleteItem}
    />
  );
}

if (page === "recommendation") {
  return <Recommendation 
      setPage={navigate}
      goBack={goBack}
      rentalCart={rentalCart}
      likedItems={likedItems}
      addLikeItem={addLikeItem}
      showLikePopup={showLikePopup}
      addRentalItem={addRentalItem} 
      rentalCart={rentalCart} 
      likedItems={likedItems} 
  />;
}

if (page === "shop") {
  return (
    <Shop
      setPage={navigate}
      goBack={goBack}
      rentalCart={rentalCart}
      likedItems={likedItems}
      addLikeItem={addLikeItem}
      showLikePopup={showLikePopup}
      addRentalItem={addRentalItem} 
      rentalCart={rentalCart} 
      likedItems={likedItems} 
    />
  );
}

if (page === "Fa") {
   return <Fa setPage={setPage} addRentalItem={addRentalItem} rentalCart={rentalCart} 
   likedItems={likedItems} 
      setPage={setPage}
      goBack={goBack}
      rentalCart={rentalCart}
      likedItems={likedItems}
      addLikeItem={addLikeItem}
      showLikePopup={showLikePopup}
   />;
}
if (page === "Orange") {
  return (
    <Orange
      setPage={navigate}
      goBack={goBack}
      addRentalItem={addRentalItem}
      rentalCart={rentalCart}
      likedItems={likedItems}
      addLikeItem={addLikeItem}
      removeLikeItem={removeLikeItem}
      showLikePopup={showLikePopup}
      showRemovePopup={showRemovePopup}
      likeFadeAnim={likeFadeAnim}
      removeFadeAnim={removeFadeAnim}
    />
  );
}

if (page === "Pom") {
  return (
    <Pompom
      setPage={navigate}
      goBack={goBack}
      addRentalItem={addRentalItem}
      rentalCart={rentalCart}
      likedItems={likedItems}
      addLikeItem={addLikeItem}
      removeLikeItem={removeLikeItem}
      showLikePopup={showLikePopup}
      showRemovePopup={showRemovePopup}
      likeFadeAnim={likeFadeAnim}
      removeFadeAnim={removeFadeAnim}
    />
  );
}

if (page === "Review") {
  return <Review setPage={setPage} addRentalItem={addRentalItem} rentalCart={rentalCart} />;
}

if (page === "Favourite") {
  return (
    <Favourite
      setPage={setPage}
      goBack={goBack}
      rentalCart={rentalCart}
      likedItems={likedItems}
      deleteItem={deleteLikedItem}
    />
  );
}

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
          <Ionicons name="menu" size={28} style={styles.menu} />
        </View>
        

        <View style={styles.tabs}>
         <View style={styles.tabs}>
  <TouchableOpacity style={styles.tab} onPress={() => navigate("shop")}>
    <Text style={styles.tabText}>Shop</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.tab} onPress={() => navigate("recommendation")}>
    <Text style={styles.tabText}>Rental</Text>
  </TouchableOpacity>
</View>
        </View>

        <View style={styles.hero}>
          <Image source={Banner} style={styles.bannerImage} resizeMode="cover" />

          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Summer Discount</Text>

            <Text style={styles.heroText}>
              Up to 15% off on selected items in our boutique!
            </Text>

            <Text style={styles.shopNow}>Shop Now</Text>
          </View>
        </View>

        <View style={styles.brandSection}>
          <Text style={styles.sectionTitle}>Featured Brands</Text>

          <View style={styles.brandGrid}>
            {brands.map((brand) => (
              <View key={brand} style={styles.brandButton}>
                <Text style={styles.brandText}>{brand}</Text>
              </View>
            ))}
          </View>
        </View>

        

        <Section title="Recommendations">
  <View style={styles.row}>
    {rentalItems.map((item) => (
      <ProductCard
        key={item.type}
        item={item}
        showCartPopup={showCartPopup}
        addRentalItem={addRentalItem}
        showLikePopup={showLikePopup}
        showRemovePopup={showRemovePopup}
        addLikeItem={addLikeItem}
        removeLikeItem={removeLikeItem}
        setPage={navigate}
      />
    ))}
  </View>
</Section>

<Section title="Our Shop">
  <View style={styles.row}>
    {shopItems.map((item) => (
      <ProductCard
        key={item.type}
        item={item}
        shop
        showCartPopup={showCartPopup}
        addRentalItem={addRentalItem}
        showLikePopup={showLikePopup}
        showRemovePopup={showRemovePopup}
        addLikeItem={addLikeItem}
        removeLikeItem={removeLikeItem}
        setPage={navigate}
      />
    ))}
  </View>
</Section>


<Section title="Recently Viewed">
  <View style={styles.row}>
    {rentalItems.map((item) => (
      <ProductCard
        key={item.type}
        item={item}
        showCartPopup={showCartPopup}
        addRentalItem={addRentalItem}
        showLikePopup={showLikePopup}
        showRemovePopup={showRemovePopup}
        addLikeItem={addLikeItem}
        removeLikeItem={removeLikeItem}
        setPage={navigate}
      />
    ))}
  </View>


          <TouchableOpacity onPress={() => navigate("recommendation")}>
            <Text style={styles.more}>More...</Text>
          </TouchableOpacity>
        </Section>

       <Section title="Our Shop">
  <View style={styles.row}>
    {shopItems.map((item) => (
      <ProductCard
        key={item.type}
        item={item}
        shop
        showCartPopup={showCartPopup}
        addRentalItem={addRentalItem}
        showLikePopup={showLikePopup}
        showRemovePopup={showRemovePopup}
        addLikeItem={addLikeItem}
        setPage={navigate}
      />
          ))}
        </View>

        <Text style={styles.more}>More...</Text>
      </Section>

        <Text style={styles.sectionTitle}>About Us</Text>

        <View style={styles.about}>
          <Text style={styles.aboutText}>
            Boardwalk Boutique is Vancouver's destination for skaters and streetwear enthusiasts, offering skater clothing and high quality skateboard rentals for every experience
          </Text>

          <Image source={AboutUs} style={styles.aboutImage} resizeMode="cover" />
        </View>

       <View style={styles.footer}>
  <View style={styles.newsletter}>
    <Text style={styles.newsletterTitle}>Subscribe to our News Letter!</Text>
    <Text style={styles.newsletterSubtitle}>
      Get the newest deals and what's new in the boutique!
    </Text>

    <View style={styles.newsletterRow}>
      <TextInput
        style={styles.emailInput}
        placeholder="Email address"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubscribe}>
        <Text style={styles.submitButtonText}>Submit!</Text>
      </TouchableOpacity>
    </View>
  </View>

  <View style={styles.footerBottom}>
    <Text style={styles.footerAddress}>
      872 Seymour Street, Vancouver{"\n"}British Columbia, V6B 3L5, Canada
    </Text>

    <View style={styles.footerContactRow}>
      <Text style={styles.footerContact}>(123) 4567890</Text>
      <Text style={styles.footerContact}>contact@boardwalk.com</Text>
    </View>

    <View style={styles.footerIcons}>
      <Ionicons name="logo-facebook" size={22} color={DARK} />
      <Ionicons name="logo-twitter" size={22} color={DARK} />
      <Ionicons name="logo-youtube" size={22} color={DARK} />
      <Ionicons name="logo-linkedin" size={22} color={DARK} />
    </View>

    <Text style={styles.footerLinks}>
      About Us | Rental Policy | FAQ | Careers
    </Text>
  </View>
</View>
</ScrollView>

      {/* this is the adding to cart */}
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

      {/* the remove from favourite list */}
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

       {/* the add to favourite list */}
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

     <View style={styles.bottomNav}>
        {/* the home button */}
        <TouchableOpacity onPress={() => navigate("home")} >
                  <Ionicons name="home-outline" size={24} />
        </TouchableOpacity>
        {/* the shopping cart */}
        <TouchableOpacity onPress={() => navigate("rentalInfo")}>
          <View>
            <Ionicons name="cart-outline" size={24} />
            {totalItems > 0 && (
              <View style={styles.bottomCartBadge}>
                <Text style={styles.cartBadgeText}>{totalItems}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        
          {/* go to the recommendation page */}
          <TouchableOpacity onPress={() => navigate("recommendation")}>
                  <Ionicons name="add-circle-outline" size={24} />
          </TouchableOpacity> 

          {/* going to liked page */}
          <TouchableOpacity onPress={() => navigate("Favourite")} >
                  <Ionicons name="heart-outline" size={24} />
                   {totalLiked > 0 && (
              <View style={styles.bottomLikeBadge}>
                <Text style={styles.LikeBadgeText}>{totalLiked}</Text>
              </View>
            )}
          </TouchableOpacity>
          </View>
    </View>
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

  logoImage: {
    width: 170,
    height: 80,
  },

  menu: {
    position: "absolute",
    right: 24,
    top: 30,
  },

  tabs: {
  flexDirection: "row",
  backgroundColor: "white",
  height: 60,
  width: "100%",
  alignItems: "center",
},

tab: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  borderRightWidth: 1,
  borderColor: "#C8D4EE",
},

tabText: {
  fontSize: 28,
  color: "#85A0D8",
  fontFamily: "serif",
},

  hero: {
    height: 140,
    backgroundColor: "white",
    position: "relative",
    overflow: "hidden",
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  heroOverlay: {
    height: "100%",
    padding: 20,
    justifyContent: "center",
  },

  heroTitle: {
    color: DARK,
    fontWeight: "bold",
    fontFamily: "serif",
  },

  heroText: {
    color: DARK,
    width: 155,
    marginTop: 8,
    fontWeight: "bold",
    fontFamily: "serif",
    lineHeight: 16,
  },

  shopNow: {
    position: "absolute",
    right: 28,
    bottom: 40,
    color: "#B00000",
    fontWeight: "bold",
    fontFamily: "serif",
  },

  brandSection: {
    backgroundColor: "white",
    padding: 18,
  },

  section: {
    paddingVertical: 36,
    paddingHorizontal: 18,
  },

  sectionTitle: {
    color: DARK,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "serif",
    marginBottom: 25,
  },

  brandGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },

  brandButton: {
    backgroundColor: BUTTON_BLUE,
    width: "30%",
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  brandText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    fontFamily: "serif",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    width: "30%",
    alignItems: "center",
  },

  boardImage: {
    height: 135,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  shopImage: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  realBoard: {
    width: 70,
    height: 130,
  },

  realShopItem: {
    width: 80,
    height: 80,
  },

  icons: {
    position: "absolute",
    right: 2,
    bottom: 8,
    gap: 2,
  },

  productName: {
    color: DARK,
    textAlign: "center",
    fontFamily: "serif",
    fontSize: 12,
    lineHeight: 14,
  },

  productType: {
    color: DARK,
    textAlign: "center",
    fontFamily: "serif",
    fontSize: 10,
    marginTop: 2,
  },

  price: {
    color: DARK,
    textAlign: "center",
    fontFamily: "serif",
    fontSize: 11,
    marginTop: 5,
  },

  details: {
    color: DARK,
    textAlign: "center",
    fontFamily: "serif",
    fontSize: 10,
    marginTop: 8,
  },

  more: {
    textAlign: "right",
    marginTop: 28,
    textDecorationLine: "underline",
    fontSize: 11,
  },

  about: {
    height: 240,
    backgroundColor: "#020713",
    padding: 24,
    justifyContent: "center",
    overflow: "hidden",
  },

  aboutText: {
    color: "white",
    width: "48%",
    fontSize: 11,
    textAlign: "left",
    lineHeight: 15,
    fontFamily: "serif",
    zIndex: 2,
  },

  aboutImage: {
    position: "absolute",
    right: 0,
    width: "65%",
    height: "100%",
  },

  location: {
    backgroundColor: "white",
    paddingTop: 22,
  },

  footer: {
  backgroundColor: "white",
},

newsletter: {
  padding: 24,
  alignItems: "center",
},

newsletterTitle: {
  fontSize: 22,
  fontWeight: "bold",
  fontFamily: "serif",
  color: DARK,
  textAlign: "center",
  marginBottom: 10,
},

newsletterSubtitle: {
  fontSize: 13,
  color: DARK,
  textAlign: "center",
  marginBottom: 16,
},

newsletterRow: {
  flexDirection: "row",
  width: "100%",
},

emailInput: {
  flex: 1,
  backgroundColor: "#EEEEEE",
  paddingHorizontal: 14,
  fontSize: 13,
},

submitButton: {
  backgroundColor: DARK,
  paddingHorizontal: 20,
  justifyContent: "center",
  alignItems: "center",
},

submitButtonText: {
  color: "white",
  fontWeight: "600",
  fontSize: 13,
},

footerBottom: {
  backgroundColor: BLUE,
  paddingVertical: 24,
  alignItems: "center",
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
},

footerAddress: {
  color: DARK,
  textAlign: "center",
  fontSize: 12,
  marginBottom: 12,
},

footerContactRow: {
  flexDirection: "row",
  gap: 20,
  marginBottom: 16,
},

footerContact: {
  color: DARK,
  fontSize: 12,
},

footerIcons: {
  flexDirection: "row",
  gap: 18,
  marginBottom: 16,
},

footerLinks: {
  color: DARK,
  fontSize: 12,
  textAlign: "center",
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

  cartBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "red",
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
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

  cartBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },

  LikeBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
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
});