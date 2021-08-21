//Imports

import {useState, useEffect} from 'react';
import '../Css/Wishlist.css';

const WishlistPage = () => {

    // local storage (refreshing the page wont make you lose login state data)

    // Setting states
    const [userName, setUserName] = useState(null);
    const [wishlist, setWishlist] = useState(null);
    const [userId, setUserId] = useState(null);

    /*async function getUserId() {
        let url = `http://localhost:8080/getDetails?userName=${userName[0]}`;
        return await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setUserId(data.id);
            });
    }*/

    useEffect(() => {
        setTimeout(() => {
            setUserName(JSON.parse(localStorage.getItem("user-login-email")));
            console.log(userName);

            }, 1000);

    }, [])

    /*useEffect(() => {
        console.log(userName);
        if (userName) {
            getUserId();
        }
    }, [userName])*/

    useEffect(() => {
        console.log(userName);
        getWishlist();
    }, [userName])

    async function getWishlist()
    {
        let newWishList = [];
        let url = `http://localhost:8080/getWishlist?user_name=` + userName;
        console.log(userName);
        if (userName != null || userName != '') {
            const fetchList = async () => {
                const response = await fetch(url)
                console.log(response)
                const json = await response.json()
                console.log(json)
                if (json.length === 0 || json == null){
                    return
                }
                json.forEach(element =>
                    newWishList.push(
                        <tr>
                            <div>
                                <h4>{element.countryCode3.countryName.toString()}</h4>
                            </div>
                            <div>
                                <button type="button" onClick={() => handleRemove(element.countryCode3)}>
                                    Remove
                                </button>
                            </div>
                        </tr>
                    )
                );
                setWishlist(newWishList)
            }
            await fetchList();
            /*await fetch(url)
                .then((response) => response.json())
                .then(json => json.forEach(element => {
                    newWishList.push(
                        <tr>
                            <div>
                                <h4>{element.countryCode3.countryName.toString()}</h4>
                            </div>
                            <div>
                                <button type="button" onClick={() => handleRemove(element.countryCode3)}>
                                    Remove
                                </button>
                            </div>
                        </tr>
                    );
                    console.log(element);
                }))
        }
        setWishlist(newWishList);
*/
        }
        return newWishList;
    }

    function handleRemove(code) {
        //remove destination from wishlist handler
        console.log(code);
        const newWishlist = wishlist.filter((destination) => destination.code !== code);

        setWishlist(newWishlist);
    }

    return (

        <div>
            <h1>Wishlist</h1>
            {console.log('test')}
            <div>
                {wishlist == null || wishlist == '' ? (
                    //If user has no items in their wishlist
                    <p>Please search to find destinations to add to your wishlist</p>
                ) : (
                    //Displays populated wishlist
                    <table className="wishlist-table">{wishlist}</table>
                )}

            </div>
        </div>
    )
}

export default WishlistPage;