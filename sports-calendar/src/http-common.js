import axios from "axios";
export default axios.create({
  baseURL: "https://localhost:44380/api",
  headers: {
    "Content-type": "application/json",
    "Authorization":"bearer 0K9fijCpf0SCRdhIU4BAluJVyxaRiTY4Tj9q6Cr6mcROSHLhrAGtmm7az-CbhN9sWK_MAen56VP3Lqltwbxa2eL7T3IoXDBsHezHfU4r5XN730tdcZo4vXsnkBJm0Gg0cxzY8cj7dOfC9dg5vzNNzvRpseE2XFgfHGXpwW-f6-MTFXZS5wAogP5JM8a5Vih9gk5CJY6MvsWDrQAvhpDIqDxee1NWFIiC-7flMRrcPKfx3zNh1_8QihDwglnCr9fOKmB0ijHYsHIQIt8QN-qiBthgmAROSYUbaNlbtFw2BeIrqZDdDGjfRPp5HW4G-idWPH8CCKa3heLGzNHS9kjpCxoHmHLM5S4azZerbCVqOtZYqwuDR6cMaEzkth78XgIs"
  }
});