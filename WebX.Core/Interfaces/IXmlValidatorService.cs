using AutoClutch.Repo.Objects;
using System.Collections.Generic;

namespace WebX.Core.Interfaces
{
    public interface IXmlValidatorService
    {
        bool IsValidXml(string xmlFilePath, string xsdFilePath);

        List<Error> Errors { get; }
    }
}