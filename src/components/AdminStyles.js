import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
const styles = {
    searchBox: {
        top: 20,
        position: "absolute",
        width: width
    },
    inputWrapper: {
        marginLeft: 15,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 0,
        backgroundColor: "#fff",
        opacity: 0.9,
        borderRadius: 7
    },
    secondInputWrapper: {
        marginLeft: 15,
        marginRight: 10,
        marginTop: 0,
        backgroundColor: "#fff",
        opacity: 0.9,
        borderRadius: 7
    },
    inputSearch: {
        fontSize: 14
    },
    label: {
        fontSize: 10,
        fontStyle: "italic",
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 0
    },
    searchResultsWrapper: {
        top: 200,
        position: "absolute",
        width: width,
        height: 1000,
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
