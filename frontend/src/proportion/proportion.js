
import {
    useWindowDimensions,
} from "react-native";


export default function get_value_by_ratio_triggers(values) {
    const { height, width } = useWindowDimensions();
    const trigger = width / height;
    const proportionTriggers = [0.65,0.75,1.0,1.25];

    if(values.length < proportionTriggers.length + 1)
    {
        throw `error: function needs at least ${proportionTriggers.length + 1} values`;
    }

    for(let i = 0; i < proportionTriggers.length; ++i)
    {
        if(trigger < proportionTriggers[i]) return values[i];
    }  
    
    return values[values.length-1];
}