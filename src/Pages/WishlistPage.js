//Imports

import {useState, useEffect} from 'react';
import '../Css/Wishlist.css';

const WishlistPage = () => {

    // local storage (refreshing the page wont make you lose login state data)

    // Setting states
    const [userName, setUserName] = useState(null);
    const [wishlist, setWishlist] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setUserName(JSON.parse(localStorage.getItem("user-login-email")));
            console.log(userName);

            }, 100);

    }, [])


    useEffect(() => {
        console.log(userName);
        if (userName) {
            getWishlist();
        }
    }, [userName])

    async function getWishlist()
    {
        let newWishList = [];
        let url = `/getWishlist?user_name=` + userName;
        console.log(userName);
        if (userName != null || userName != '') {
            const fetchList = async () => {
                const response = await fetch(url)
                //const json = await response.json()
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        data.forEach(element =>
                            newWishList.push(
                                <tr>
                                    <div>
                                        <h4>{element.countryCode3.airport}</h4>
                                    </div>
                                    <div>
                                        <button type="button" onClick={() => handleRemove(element)}>
                                            Remove
                                        </button>
                                    </div>
                                </tr>
                            )
                        );
                        setWishlist(newWishList)
                    });
            }
            await fetchList();
        }
        return newWishList;
    }

    async function handleRemove(element) {
        // retrieve data from db
        await fetch('/removeWishlistItem', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userName[0],
                countryCode3: element.countryCode3.destinationCode
            })
        })
            .then(response => {
                const data = response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                getWishlist();
            })
            .catch(error => {
                console.error('CATCH ERROR: ', error.toString());
            });

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