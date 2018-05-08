import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
const styles = {
    searchBox: {
        top: 40,
        position: "absolute",
        width: width
    },
    inputWrapper: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 0,
        backgroundColor: "#fff",
        opacity: 1.0,
        borderRadius: 0
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
        fontSize: 16,
        color: "#373737"
    },
    label: {
        fontSize: 10,
        fontStyle: "italic",
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 0
    }
};

export default styles;
