import { memo } from 'react';
import { PiXCircleDuotone } from "react-icons/pi";
import Input from "./Input";
import Label from "./Label";
import Button from "./Button";
import './Search.css';

const Search = ({ id, className, type, placeholder, name, value, onChange, isLabel = false, labelCont, isButton = false, buttonCont, buttonType, buttonClick, buttonIcon, isSearchResult = false, children, handleInputReset }) => {
    return (
        <div className="search_wrap">
            {isLabel && <Label htmlFor={id} content={labelCont} className={`label_type1 search_label ${className}`} /> } 
            <div className="search_inner">
                <Input
                    id={id}
                    type={type} 
                    placeholder={placeholder}
                    className={`input_type1 search_input ${className}`} 
                    name={name}
                    value={value} 
                    onChange={onChange} 
                />
                <div className="is_button">
                    {value && ( 
                        <div className="search_button_wrap">
                            <Button className={`button_type_search reset_button ${className}`} onClick={handleInputReset} type={"button"}><PiXCircleDuotone /></Button>
                        </div>
                    )}
                    {isButton && (
                        <div className="search_button_wrap">
                            <Button className={`button_type_search search_button ${className}`} onClick={buttonClick} type={buttonType}>{buttonCont}{buttonIcon}</Button>
                        </div>
                    )}
                </div>
            </div>

            {isSearchResult && (
                <div className="search_result">
                    {children}
                </div>
            )}
        </div>
    );
};

export default memo(Search);