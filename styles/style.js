import { Dimensions, StatusBar, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight
    },
    heading: {
        fontWeight: "500",
        letterSpacing: 1.2,
        marginBottom: 25
    },
    title: {
        fontSize: 35,
        padding: 10,
        textAlign: 'center'
    },
    text: {
        marginTop: 0,
        marginBottom: 6,
        fontSize: 15
    },
    inputGroup: {
        marginBottom: 15,
        paddingHorizontal: 35
    },
    inputBox: {
        borderColor: "#848884",
        borderWidth: 1,
        borderRadius: 10,
        padding: 6
    },
    inputInlineGrouping: {
        flexDirection: "row",
        maxWidth: Dimensions.get('screen').width,
        justifyContent: 'space-evenly',
        paddingHorizontal: 50,
    },
    inLineGrouping: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop: 10
    }
});

export default styles;