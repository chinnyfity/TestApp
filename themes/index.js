import { Dimensions, StyleSheet } from "react-native";

const screenHeight = Dimensions.get('window').height;
const maxHeightTop = (1.60 * screenHeight) / 4;
const maxHeightBottom = (2.4 * screenHeight) / 4;

const styles = StyleSheet.create({

    contentContainerStyle: {
        // flexGrow: 1,
        flex: 1,
        justifyContent: 'space-between',
    },

    scrollView: {
        flex: 12,
        backgroundColor:'#fff' 
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
        
    },

    nunitoFontBold: {
        fontFamily: 'Nunito-Bold',
    },
    QuicksandBold: {
        fontFamily: 'Quicksand-Bold',
    },
    nunitoFontMid: {
        fontFamily: 'Nunito-Medium',
    },
    QuicksandMid: {
        fontFamily: 'Quicksand-Medium',
    },

    roundCardTop: {
        flex: 1,
        backgroundColor: '#eee',
        borderBottomRightRadius: 80,
        height: maxHeightTop,
        height: 100,
        zIndex:2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    roundCardMiddle: {
        flex: 1,
        backgroundColor: 'rgba(122, 71, 204, 0.917)',
        borderTopLeftRadius: 80,
        padding: 50,
        marginTop:-120,
        zIndex:1,
    },

    roundCardBottom: {
        // flex: 1,
        backgroundColor: 'rgba(30, 30, 30, 0.1)',
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 18,
        paddingTop: 0,
        minHeight: maxHeightBottom,
    },

    roundCardBottom1: {
        flex: 1,
        padding: 15,
    },

    thinLine: {
        borderBottomWidth: 3,
        borderBottomColor: '#999',
        width: 60,
        margin:'auto',
        marginBottom: 10,
    },

    roundCardMiddle1: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 0,
        padding: 50,
        marginTop:-117,
        // marginTop:-40,
        zIndex:1,
    },

    inputBox: {
        padding: 12,
        paddingHorizontal: 12,
        borderRadius: 10,
        color: '#333',
        marginTop: 1,
        marginBottom: 24,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 17,
        fontWeight: '400',
        borderWidth: 1,
        borderBottomWidth: 1,
        borderColor:'#ccc',
        backgroundColor: 'white',
        fontFamily: 'Nunito-Medium',
        height: 'auto',
        minHeight: 53,
    },

    buttonContainer: {
        bottom: 15,
        width: '100%',
        paddingHorizontal: 5,
        paddingBottom: 20,
        marginTop: 20,
        position:'relative',
    },

    buttonContainer1: {
        position:'absolute',
        bottom: '-1%',
        width: '100%',
        paddingHorizontal: 5,
        paddingBottom: 0,
    },

    textContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 0,
        paddingTop: 0,
        paddingBottom: 10,
        position: 'relative',
        top: -15,
    },

    passStr: {
        backgroundColor: '#eee',
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 6,
        fontSize: 13,
        color: '#000',
        fontWeight: '400',
    },

    btnActive: {
        borderWidth: 0,
    },

    customBtns: {
        borderWidth: 0,
        borderColor: 'none',
        height: 50,
        
    },
  
    btnColor: {
        color: '#fff',
        fontFamily: 'Nunito-Bold',
        fontSize: 15,
    },
    btnColorActive: {
        color: '#04bf71', 
    },

    lgLabel: {
        fontSize: 21,
        fontFamily: 'Nunito-Bold',
        color:'#111',
        textAlign:'center',
    },
    smallLabel: {
        fontSize: 15,
        fontFamily: 'Nunito-Bold',
        color:'#7a47cc',
    },
    containers: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        elevation: 4,
    },

    smallBtnsSupport: {
        backgroundColor:'#fff',
        elevation: 6,
        width: 88,
        height: 88,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
        borderRadius: 15,
        padding: 10,
        paddingTop: 23,
        textAlign: 'center',
    },
    texts1: {
        marginTop: 6,
    },

    texts2: {
        width: 80,
    },
    flatlist_items: {
        padding: 0,
        marginVertical: 0,
        marginHorizontal: 0,
    },

    links: {
        color:'#7b47cc',
        
    },

    flatlist_items1: {
        padding: 15,
        marginVertical: 0,
        marginHorizontal: 0,
    },

    flatlist_items2: {
        padding: 6,
        paddingLeft: 10,
        backgroundColor: '#eee',
        borderRadius:50,
        elevation: 1,
        marginVertical: 3,
        borderWidth: 1,
        borderColor: '#ccc',
    },

    dropdown: {
        padding: 13,
        paddingHorizontal: 10,
        borderRadius: 10,
        color: '#333',
        marginTop: 1,
        marginBottom: 17,
        fontSize: 21,
        fontWeight: '400',
        borderWidth: 1,
        borderBottomWidth: 1,
        borderColor:'#ccc',
        backgroundColor: '#fff',
        fontFamily: 'Nunito-Medium',
        height: 'auto',
        minHeight: 56,  
    },

    selectedTextStyle: {
        fontSize: 19,
        color: '#333',
        // backgroundColor:'#ddd',
    },
    inputSearchStyle: {
        height: 60,
        fontSize: 22,
        
    },
    images: {
        width: 47,
        height: 47,
        backgroundColor:'#fff',
        borderRadius: 50,
        marginBottom: 5,
    },
    titleName: {
        fontSize: 16,
        fontFamily: 'Nunito-Medium',
        color:'#222'
    },

    boldText: {
        fontFamily: 'Nunito-ExtraBold',
        fontSize: 16,
        color:'#333',
        marginTop: -2,
    },
    smallText: {
        fontFamily: 'Nunito-Light',
        fontSize: 14,
        color:'#555',
        marginTop: 1,
    },
    bottomBorders: {
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
        paddingBottom: 6,
        marginBottom: -10,
    },
    
    dropdowns: {
        height: 50,
        borderWidth: 0,
        backgroundColor: '#ddd',
    },
    placeholderStyle: {
        color: "#444",
        fontSize: 18,
        fontWeight: 400,
    },
    notify_house: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: -60,
    },

    

    topContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        padding: 16,
        marginTop: -20,
        position: 'relative',
        top: 17,
    },

    imageContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    mapImg: {
        width: '100%',
        // width: 400,
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.2,
        zIndex: 1,
    },
    cardContainer: {
        background: '#000',
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    topBackground: {
        width:'94%',
        height: 110,
        // alignContent:'center',
        // alignItems:'center',
        alignSelf:'center',
        borderRadius: 15,
    },

    digitss: {
        fontSize: 24,
        color:'#fff',
        fontFamily: 'Nunito-Bold',
    },
    digitss1: {
        fontSize: 11,
        color:'#fff',
        fontFamily: 'Nunito-Bold',
        marginTop: 40,
    },
    digitss2: {
        fontSize: 19,
        color:'#0270a0',
        color:'#333',
        fontFamily: 'Nunito-Bold',
    },
    notifys: {
        backgroundColor:'#d50d0d',
        // backgroundColor:'rgba(50, 179, 50, 0.951)',
        paddingLeft: 5,
        width: 20,
        height: 20,
        position:'absolute',
        right: -7,
        top: -3,
        borderRadius:50,
        color: '#fff',
        zIndex: 99,
        fontSize: 11,
        fontFamily: 'Nunito-Bold',
        lineHeight: 19,
        textAlign:'center',
    },

















});

export { styles }