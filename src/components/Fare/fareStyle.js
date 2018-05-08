import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = {
    fareContainer: {
        width: width,
        height: 100,
        padding: 10,
        backgroundColor: "grey"
    },
    fareText: {
        fontSize: 12
    },
    amount: {
        fontWeight: "bold",
        fontSize: 12
    },
    searchResultsWrapper: {
        top: 350,
        position: "absolute",
        width: width,
        height: 500,
        backgroundColor: "#fff",
        opacity: 0.9
    },
    primaryText: {
        fontWeight: "bold",
        color: "#373737"
    },
    secondaryText: {
        fontStyle: "italic",
        color: "#7D7D7D",
    },
    leftContainer: {
        flexWrap: "wrap",
        alignItems: "flex-start",
        borderLeftColor: "#7D7D7D",
    },
    leftIcon: {
        fontSize: 20,
        color: "#7D7D7D",
    },
    distance: {
        fontSize: 12,
    }
};

export default styles;