const { Parser, transforms: { unwind } } = require('json2csv');

const fields = [
  {label: 'Timezone' , value: 'info.tzinfo.name'}, 
  {label: 'Server time' , value: 'now_dt'},
  {label: 'Country' , value: 'geo_object.country.name'}, 
  {label: 'Locality' , value: 'geo_object.locality.name'}, 
  {label: 'Pressure norm for a given coordinate (in mm Hg)' , value: 'info.def_pressure_mm'},
  {label: 'Current temperature (°C)' , value: 'fact.temp'},
  {label: 'Perceived temperature at the moment (° C)' , value: 'fact.feels_like'},
  {label: 'Weather condition' , value: 'fact.condition'},
  {label: 'Current wind speed (in m/s)' , value: 'fact.wind_speed'},
  {label: 'Current gust speed (in m/s )' , value: 'fact.wind_gust'},
  {label: 'Current wind direction' , value: 'fact.wind_dir'},
  {label: 'Current pressure (in mm Hg)' , value: 'fact.pressure_mm'}, 
  {label: 'Air humidity at the moment (in %)' , value: 'fact.humidity'},
  {label: 'Sign of a thunderstorm at the moment' , value: 'fact.is_thunder'}, 
  {label: 'Current precipitation type' , value: 'fact.prec_type'},
  {label: 'Current cloudness' , value: 'fact.cloudness'}, 
  {label: 'Forecast date' , value: 'forecasts.date'},
  {label: 'This week' , value: 'forecasts.week'},
  {label: 'Sunrise time, local time' , value: 'forecasts.sunrise'},
  {label: 'Sunset time, local time' , value: 'forecasts.sunset'},
  {label: 'Forecast hour (0-23), local time' , value: 'forecasts.hours.hour'},
  {label: 'Forecast temperature (° C)' , value: 'forecasts.hours.temp'},
  {label: 'Forecast perceived temperature (° C)' , value: 'forecasts.hours.feels_like'},
  {label: 'Forecast weather condition' , value: 'forecasts.hours.condition'},
  {label: 'Forecast wind speed (in m/s)' , value: 'forecasts.hours.wind_speed'},
  {label: 'Forecast gust speed (in m/s)' , value: 'forecasts.hours.wind_gust'},
  {label: 'Forecast wind direction' , value: 'forecasts.hours.wind_dir'},
  {label: 'Forecast pressure (in mm Hg)' , value: 'forecasts.hours.pressure_mm'}, 
  {label: 'Forecast air humidity at the moment (in %)' , value: 'forecasts.hours.humidity'},
  {label: 'Forecast precipitation (in mm)' , value: 'forecasts.hours.prec_mm'},
  {label: 'Forecast precipitation period (in minutes)' , value: 'forecasts.hours.prec_period'},
  {label: 'Forecast precipitation type' , value: 'forecasts.hours.prec_type'},
  {label: 'Forecast precipitation strength' , value: 'forecasts.hours.prec_strength'},
  {label: 'Forecast sign of a thunderstorm' , value: 'forecasts.hours.is_thunder'},
  {label: 'Forecast cloudness' , value: 'forecasts.hours.cloudness'},
];

const transforms = [unwind({ paths: ['forecasts', 'forecasts.hours'], blankOut: true, withBOM: true, excelStrings: true })];

module.exports = { transforms, fields };
