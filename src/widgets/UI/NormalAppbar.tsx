
import React from "react";
import NormalAppbar from "@/components/appbars/top-appbar/normal/Normal";
import SearchBar from "@/components/inputs/searchbar/Searchbar";
import Button from "@/components/buttons/Buttons";
import Logo from "@/components/logo/Logo";

interface CoreNormalAppbarProps {
    backBtn?: boolean, 
    navdrawerOpener?: () => void, 
    title?: React.ReactNode,
    hideSearchbar?: boolean
}

const CoreNormalAppbar: React.FC<CoreNormalAppbarProps> = ({ backBtn, navdrawerOpener, title, hideSearchbar }) => {

    const [query, setQuery] = React.useState('');

    const handleSearch = () => {
      console.log('Searching for:', query);
    };
  

    return(
        <NormalAppbar 
            backBtn={backBtn}
            title={title ? title : <Logo />}
            navdrawerOpener={navdrawerOpener}
            searchbar={
                !hideSearchbar ?
                <SearchBar
                    value={query}
                    onChange={setQuery}
                    onSearch={handleSearch}
                /> : null
            }
            rightButtons={
                <>
                    <Button variant="icon" icon="settings" tooltip="Settings" href="/settings" />
                    <Button variant="icon" icon="notifications" tooltip="Notifications" href="/notifications" alignTooltip="right" />
                </>
            }
        />
    )
}

export default CoreNormalAppbar;