using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnygesDesktopTeste
{
    class ConversorBytes
    {

        public static string ByteArrayToHexString(byte[] bytes)
        {
            if (bytes == null) return "";
            return "0x" + BitConverter.ToString(bytes).Replace("-", "");
        }

        public static byte[] HexStringToByteArray(string hex)
        {
            if (string.IsNullOrEmpty(hex)) return new byte[0];

            hex = hex.Replace("0x", "").Replace("-", "");

            int length = hex.Length;
            byte[] bytes = new byte[length / 2];

            for (int i = 0; i < length; i += 2)
            {
                bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
            }
            return bytes;
        }

        public static string TratarValor(object valor)
        {
            if (valor is byte[] bytes)
                return ByteArrayToHexString(bytes);
            else
                return valor?.ToString();
        }
    }
}

