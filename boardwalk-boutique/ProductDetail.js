import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from "./assets/skateboards/logo.png";

const BLUE = "#C8D4EE";
const DARK = "#12345C";

export default function ProductDetail({ item, setPage, goBack, rentalCart, likedItems, addRentalItem, addLikeItem, removeLikeItem }) {
  const cartAnim = useState(new Animated.Value(0))[0];
  const likeAnim = useState(new Animated.Value(0))[0];
  const removeAnim = useState(new Animated.Value(0))[0];

  const runPopup = (anim) => {
    Animated.sequence([
      Animated.timing(anim, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.delay(1200),
      Animated.timing(anim, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start();
  };

  const totalItems = rentalCart.reduce((sum, i) => sum + i.quantity, 0);
  const totalLiked = likedItems.reduce((sum, i) => sum + i.quantity, 0);
  const liked = likedItems.some((i) => i.type === item.type);
  const isRental = item.price.includes("/hr");
  const basic = { name: item.name, type: item.type, price: item.price, image: item.image };

  const handleLike = () => {
    if (liked) {
      removeLikeItem(basic);
      runPopup(removeAnim);
    } else {
      addLikeItem(basic);
      runPopup(likeAnim);
    }
  };

  const handleBook = () => {
    addRentalItem(basic);
    runPopup(cartAnim);
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="chevron-back" size={34} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPage("home")}>
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageBox}>
          <Image source={item.image} style={styles.image} resizeMode="contain" />
        </View>

        <Text style={styles.title}>{item.name.replace("\n", " ")}</Text>
        <Text style={styles.subtitle}>{item.type}</Text>
        <Text style={styles.price}>{item.price}</Text>

        <View style={styles.bookRow}>
          <TouchableOpacity style={styles.book} onPress={handleBook}>
            <Text style={styles.bookText}>{isRental ? "Book Now" : "Add to Cart"}</Text>
            <Ionicons name="cart-outline" size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.heart} onPress={handleLike}>
            <Ionicons name={liked ? "heart" : "heart-outline"} size={30} color={liked ? "red" : "black"} />
          </TouchableOpacity>
        </View>

        {item.description ? (
          <View>
            <Text style={styles.sectionTitle}>Description:</Text>
            <Text style={styles.body}>{item.description}</Text>
          </View>
        ) : null}

        {item.info && item.info.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Information:</Text>
            {item.info.map((line, i) => (
              <Text key={i} style={styles.body}>• {line}</Text>
            ))}
          </View>
        ) : null}
      </ScrollView>

      <Animated.View pointerEvents="none" style={[styles.screenPopup, { opacity: cartAnim }]}>
        <View style={styles.popupBox}><Text style={styles.popupText}>Item added to cart!</Text></View>
      </Animated.View>
      <Animated.View pointerEvents="none" style={[styles.screenPopup, { opacity: likeAnim }]}>
        <View style={styles.popupBox}><Text style={styles.popupText}>Added to Favourites!</Text></View>
      </Animated.View>
      <Animated.View pointerEvents="none" style={[styles.screenPopup, { opacity: removeAnim }]}>
        <View style={styles.popupBox}><Text style={styles.popupText}>Removed from Favourites.</Text></View>
      </Animated.View>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setPage("home")}>
          <Ionicons name="home-outline" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPage("rentalInfo")}>
          <Ionicons name="cart-outline" size={24} />
          {totalItems > 0 && (
            <View style={styles.badge}><Text style={styles.badgeText}>{totalItems}</Text></View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPage("recommendation")}>
          <Ionicons name="add-circle-outline" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPage("Favourite")}>
          <Ionicons name="heart-outline" size={24} />
          {totalLiked > 0 && (
            <View style={styles.badge}><Text style={styles.badgeText}>{totalLiked}</Text></View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BLUE },
  scroll: { paddingBottom: 100 },
  header: { height: 110, alignItems: "center", justifyContent: "center" },
  backButton: { position: "absolute", left: 24, top: 30, zIndex: 2 },
  logo: { width: 170, height: 80 },
  imageBox: { alignItems: "center", backgroundColor: "#fff", paddingVertical: 12 },
  image: { width: 200, height: 280 },
  title: { fontSize: 26, color: DARK, fontWeight: "bold", fontFamily: "serif", paddingHorizontal: 20, marginTop: 20 },
  subtitle: { fontSize: 15, color: DARK, fontFamily: "serif", paddingHorizontal: 20, marginTop: 4 },
  price: { fontSize: 18, color: DARK, paddingHorizontal: 20, marginTop: 10, marginBottom: 15 },
  bookRow: { flexDirection: "row", alignItems: "center", paddingLeft: 20 },
  book: { backgroundColor: DARK, width: "70%", borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12 },
  bookText: { fontSize: 20, color: "#fff", fontWeight: "bold", fontFamily: "serif" },
  heart: { marginLeft: 16 },
  sectionTitle: { fontSize: 23, color: DARK, fontWeight: "bold", fontFamily: "serif", marginVertical: 24, paddingLeft: 20 },
  body: { fontSize: 13, color: DARK, paddingHorizontal: 24, paddingBottom: 8, lineHeight: 18 },
  screenPopup: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", zIndex: 9999 },
  popupBox: { backgroundColor: "rgba(70,70,70,0.92)", paddingVertical: 14, paddingHorizontal: 24, borderRadius: 14 },
  popupText: { color: "white", fontSize: 14, fontWeight: "600" },
  bottomNav: { position: "absolute", bottom: 0, height: 55, width: "100%", backgroundColor: "white", borderTopLeftRadius: 18, borderTopRightRadius: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-around" },
  badge: { position: "absolute", top: -10, right: -10, backgroundColor: "red", minWidth: 17, height: 17, borderRadius: 9, alignItems: "center", justifyContent: "center", paddingHorizontal: 4 },
  badgeText: { color: "white", fontSize: 10, fontWeight: "bold" },
});