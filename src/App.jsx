import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect} from 'react';

export default function MyApp() {
	// Initialise Variables
	const [cookie, setCookie] = useState(0);
	const [perSecond, setPerSecond] = useState(0);
	const [isShopOpen, setIsShopOpen] = useState(0);
	const [multiplier, setMultiplier] = useState(1);
	const [multiplierPrice, setMultiplierPrice] = useState(1000);
	const [upgradePrice, setUpgradePrice] = useState(15);
	const [isLoaded, setIsLoaded] = useState(false);
	const [warning, setWarning] = useState(false);
	const [grandma, setGrandma] = useState(0);
	const [grandmaPrice, setGrandmaPric] = useState(100);

        useEffect(() => {
		const savedCookies = localStorage.getItem("cookie");
		const savedPerSecond = localStorage.getItem("perSecond");
		const savedIsShopOpen = localStorage.getItem("isShopOpen");
		const savedMultiplier = localStorage.getItem("multiplier");
		const savedUpgradePrice = localStorage.getItem("upgradePrice");
		const savedMultiplierPrice =localStorage.getItem("multiplierPrice");
		const savedGrandma=localStorage.getItem("grandma");
		const savedGrandmaPrice = localStorage.getItem("grandmaPrice");
		if (savedCookies) { 
			setCookie(Number(savedCookies));

		} 
		if (savedPerSecond) {
			setPerSecond(Number(savedPerSecond));
		}
		if (savedIsShopOpen) 
		{
			setIsShopOpen(JSON.parse(savedIsShopOpen));
		}
		if (savedMultiplier){
			setMultiplier(Number(savedMultiplier));
		}
		if (savedUpgradePrice) {
			setUpgradePrice(Number(savedUpgradePrice));

		}
		if (savedMultiplierPrice) {
			setMultiplierPrice(Number(savedMultiplierPrice));
		}
		if (savedGrandma){//
			setGrandma(Number(savedGrandma));
		}
		if (savedGrandmaPrice){
			setGrandmaPric(Number(savedGrandmaPrice));
		}
		setIsLoaded(true);
	
	}, []);

	useEffect(()=> {
		if (!isLoaded) return;
		localStorage.setItem("cookie",cookie);
		localStorage.setItem("perSecond",perSecond);
		localStorage.setItem("isShopOpen",JSON.stringify(isShopOpen));
		localStorage.setItem("multiplier",multiplier);
		localStorage.setItem("upgradePrice",upgradePrice);
		localStorage.setItem("multiplierPrice",multiplierPrice);
		localStorage.setItem("grandma",grandma);
		localStorage.setItem("grandmaPrice",grandmaPrice);
	}, [cookie,perSecond,isShopOpen,multiplier,multiplierPrice,grandma,grandmaPrice]);


	// Functions for handling the purchases
	const handleClick = () => {
		setCookie(cookie+multiplier);
		// Debug 
		// TODO add something when player reaches 5000 Clicks. 
		// no ho

	};
	const toggleShop = () => {
		setIsShopOpen(!isShopOpen);
	};
	const buyCursor = () => {
		if (cookie>=upgradePrice){
			setCookie(cookie-upgradePrice);

			setPerSecond(perSecond+0.1);
			/* MULTIPLY */
		        setUpgradePrice(upgradePrice=> Math.ceil(upgradePrice*1.01));
		

		}
	};
	const buyMultiplier = () => {
		if (cookie>=multiplierPrice) {
			setCookie(cookie-multiplierPrice);
			setMultiplier(multiplier+1);
			setMultiplierPrice(multiplierPrice*2);

		}
	}
	const buyGrandma = () => {
		if (cookie>=grandmaPrice){
			setGrandma(grandma+1);
			setCookie(cookie-grandmaPrice);
			setGrandmaPric(grandmaPrice+120);
			setPetSecond(perSecond+1);
			setGrandmaPric(grandmaPrice => Math.ceil(grandmaPrice*15.01));
		}
	}
	const deleteData = () => {
		if (window.confirm("Are you sure you want to delete your data? this action cannot be undone.")){
			localStorage.clear();
			setCookie(0);
			setPerSecond(0);
			setIsShopOpen(false);
			setUpgradePrice(15);
			setMultiplierPrice(1000);
			setMultiplier(1);
			setGrandmaPric(100);

		}
	};
	React.useEffect(() => {
		const interval = setInterval(() => {
			setCookie((prev) => prev + perSecond*multiplier);
		}, 1000);
	
	
		return () => clearInterval(interval);
	}, [perSecond,multiplier]);
// Load Site
		return ( 
		<div>
		<h1>    Cookie Clicker🍪 </h1>
		<p> Cookies: 	{cookie}</p>
		<button onClick={handleClick}>
			Click!
		</button>
/* Shop Logic */ 
  	<div>
			<button onClick={toggleShop} className="shop">
			{isShopOpen ? "Close Shop"  : "Open Shop"}
			</button>
		</div>

			{isShopOpen && (
				<div>				<h2> Shop</h2>
				<button onClick={buyCursor}>
				Buy Upgrade ({upgradePrice} Cookies, gives 1 per sec)
				</button>

				<button onClick={buyMultiplier}>
				Buy Multiplier Upgrade ({multiplierPrice}$)
				</button>
				Hire a cute grandma to bake cookies for you!
				<button onClick={buyGrandma}>
				Buy a Grandma ({grandmaPrice}🍪, 2 Cookies/sec)
				</button>
				</div>
			)}
			<p> Cookies per sec: {perSecond}</p>
			<p> Multiplier: {multiplier}</p>
			<button onClick={deleteData} style={{marginTop: "20px", backgroundColor: "red", color: "white"}}>
			Reset Data ⛔️
			</button>
			</div>

		);


	
}

