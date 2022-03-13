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
    },
    userList: {
        width: '100%',
        height: '20%',
        backgroundColor: '#FFF',
        marginTop: 20,
    },
    user: {
        backgroundColor: '#ed8f1c',
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    nameList: {
        width: '50%',
        fontSize: 18,
        paddingRight: 10,
    },
    emailDataList: {
        width: '40%',
        flexDirection: 'row',
    },
    actionButtonData: {
        width: '10%',
    },
    emailIcon: {
        width: 20,
        height: 25,
        marginRight: 5,
    },
    emailList: {
        color: "#FFF",
        fontSize: 18,
    }
});

export default styles;