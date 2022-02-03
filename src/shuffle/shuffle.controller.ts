import { Request, Response } from "express";
import { Collections, messageViewQuotes } from "../config/constants";
import {
  createMultipleElements,
  deleteElementShuffle,
  findAllElementsShuffle,
  findElement,
  findElementById,
  updateElementById,
} from "../lib/db-operations";

const getShuffleQuote = (req: Request, res: Response) => {
  const { id } = req.params;
  const send = {
    status: false,
    message: messageViewQuotes.ERROR_DEFAULT,
  };
  findElementById(Collections.users, id, (err, results) => {
    if (err) return res.status(400).send(send);

    if (results.length === 0)
      return res
        .status(400)
        .send({ ...send, message: messageViewQuotes.INVALID_KEY });

    const user = results[0];
    let checkDate = true;
    let dailyQuote: any = [];
    if (user.dailyQuote !== null) {
      dailyQuote = user.dailyQuote.split("$/*");
      checkDate = dailyQuote[1] < new Date().toLocaleDateString();
    }

    if (!checkDate) {
      findElementById(
        Collections.quotes,
        parseInt(dailyQuote[0]),
        (errQuote, resultsQuote) => {
          if (errQuote) return res.status(400).send(send);

          if (resultsQuote.length === 0)
            deleteElementShuffle(
              user.id,
              parseInt(dailyQuote[0]),
              (errDeleted) => {
                if (errDeleted) return res.status(400).send(send);
                updateElementById(
                  Collections.users,
                  user.id,
                  { dailyQuote: null },
                  (er) => {
                    return res.status(400).send({
                      ...send,
                      message: messageViewQuotes.NOT_ACCESS,
                    });
                  }
                );
              }
            );
          else {
            const quote = resultsQuote[0];
            delete quote.id;
            delete quote.role;
            delete quote.idUser;
            delete quote.registerDate;
            if (results.length === 0) return res.status(400).send(send);
            return res.status(200).send({ status: true, quote });
          }
        }
      );
    } else {
      findElement(
        Collections.shuffle,
        "userId",
        user.id,
        (errShuffle, resultsShuffle) => {
          if (errShuffle) return res.status(400).send(send);
          if (resultsShuffle.length === 0) {
            findAllElementsShuffle(
              user.id,
              user.allQuotes,
              (errAllQuotes, resAllQuotes) => {
                if (errAllQuotes) return res.status(400).send(send);
                if (resAllQuotes.length === 0)
                  return res.status(200).send({
                    status: false,
                    message: messageViewQuotes.EMPTY_RESPONSE,
                  });
                const shuffle = Math.floor(
                  Math.random() * resultsShuffle.length
                );
                const quote = resAllQuotes[shuffle];
                if (resAllQuotes.length - 1) {
                  resAllQuotes = resAllQuotes.splice(shuffle, 1);
                }
                resAllQuotes = resAllQuotes.map((child: any) => [
                  user.id,
                  child.id,
                ]);

                createMultipleElements(
                  Collections.shuffle,
                  resAllQuotes,
                  (errCreate) => {
                    if (errCreate) return res.status(400).send(send);
                    const dailyQuote = `${
                      quote.id
                    }$/*${new Date().toLocaleDateString()}`;
                    updateElementById(
                      Collections.users,
                      user.id,
                      { dailyQuote },
                      (errUpdate) => {
                        delete quote.id;
                        delete quote.role;
                        delete quote.idUser;
                        delete quote.registerDate;
                        return res.status(200).send({ status: true, quote });
                      }
                    );
                  }
                );
              }
            );
          } else {
            const shuffle = Math.floor(Math.random() * resultsShuffle.length);
            const shuffleQuote = resultsShuffle[shuffle];

            findElementById(
              Collections.quotes,
              shuffleQuote.quoteId,
              (errFind, quotes) => {
                if (errFind) return res.status(400).send(send);

                if (results.length === 0)
                  deleteElementShuffle(
                    shuffleQuote.userId,
                    shuffleQuote.quoteId,
                    (errDeleted) => {
                      if (errDeleted) return res.status(400).send(send);
                      return res.status(400).send({
                        ...send,
                        message: messageViewQuotes.NOT_ACCESS,
                      });
                    }
                  );
                if (resultsShuffle.length - 1) {
                  deleteElementShuffle(
                    shuffleQuote.userId,
                    shuffleQuote.quoteId,
                    (errDeleted) => {
                      if (errDeleted) return res.status(400).send(send);
                      const quote = quotes[0];
                      const dailyQuote = `${
                        quote.id
                      }$/*${new Date().toLocaleDateString()}`;
                      updateElementById(
                        Collections.users,
                        user.id,
                        { dailyQuote },
                        (errUpdate) => {
                          delete quote.id;
                          delete quote.role;
                          delete quote.idUser;
                          delete quote.registerDate;
                          return res.status(200).send({ status: true, quote });
                        }
                      );
                    }
                  );
                } else {
                  const quote = quotes[0];
                  const dailyQuote = `${
                    quote.id
                  }$/*${new Date().toLocaleDateString()}`;
                  updateElementById(
                    Collections.users,
                    user.id,
                    { dailyQuote },
                    (errUpdate) => {
                      delete quote.id;
                      delete quote.role;
                      delete quote.idUser;
                      delete quote.registerDate;
                      return res.status(200).send({ status: true, quote });
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
};

export default { getShuffleQuote };
