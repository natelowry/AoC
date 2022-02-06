using System;
using System.IO;
using System.Linq;
using System.Collections;
using System.Collections.Generic;


// var allWords = File.ReadAllLines("./usa2.txt");
// var allWords = File.ReadAllLines("./words_alpha.txt");
var allWords = File.ReadAllLines("./wordle_word_list.txt");

Derp.All5LetterWords = allWords.Where(w => w.Length == 5).Select(w => w.ToUpper());
Derp.Ranked5LetterWords = Derp.All5LetterWords.Select(w => new WordWithRanking { Word = w, Ranking = GetGreenScoreFor(w) }).OrderByDescending(x => x.Ranking);

Console.WriteLine($"Best guess: {Derp.Ranked5LetterWords.First().Word}");


//nate
// var currentConstraints = new Constraints
// {
//     ExcludedLetters = new[] { 'S', 'H' },
//     IncludedLetters = new[] {
//         new LetterWithIndex('A', 2),
//     },
//     KnownLetters = new[] {
//         new LetterWithIndex('F', 3),
//         new LetterWithIndex('T', 4),
//     },
// };

//carrie
// var currentConstraints = new Constraints
// {
//     IncludedLetters = new[] {
//         new LetterWithIndex('F', 0),
//         new LetterWithIndex('A', 3),
//     },
//     KnownLetters = new[] {
//         new LetterWithIndex('L',1),
//         new LetterWithIndex('O',2),
//         new LetterWithIndex('T',4),
//     }
// };

var currentConstraints = new Constraints
{
    ExcludedLetters = new[] { 'L', 'T', 'E' },
    IncludedLetters = new[] {
        new LetterWithIndex('S', 0),
    },
    KnownLetters = new[] {
        new LetterWithIndex('A', 2),
    }
};

var nextBest = GetBestRemainingWord(currentConstraints);
Console.WriteLine(nextBest);

//sanes
// var currentConstraints = new Constraints
// {
//     ExcludedLetters = new[] { 'S', 'N', 'E' },
//     IncludedLetters = new[] {
//         new LetterWithIndex('A', 1),
//     },
// };

// var nextBest = GetBestRemainingWord(currentConstraints);
// Console.WriteLine(nextBest);

// currentConstraints = new Constraints
// {
//     ExcludedLetters = new[] { 'S', 'N', 'E', 'M', 'R', 'Y' },
//     IncludedLetters = new[] {
//         new LetterWithIndex('A', 1),
//         new LetterWithIndex('A', 3),
//         new LetterWithIndex('O', 1),
//     },
// };
// nextBest = GetBestRemainingWord(currentConstraints);
// Console.WriteLine(nextBest);

// currentConstraints = new Constraints 
// {
//     ExcludedLetters = new[] { 'S', 'N', 'E', 'M', 'R', 'Y', 'B', 'I' },
//     IncludedLetters = new[] {
//         new LetterWithIndex('A', 1),
//         new LetterWithIndex('A', 3),
//         new LetterWithIndex('A', 4),
//         new LetterWithIndex('O', 1),
//         new LetterWithIndex('T', 3),
//     },
//     KnownLetters = new[] {
//         new LetterWithIndex('O', 2),
//     }
// };
// nextBest = GetBestRemainingWord(currentConstraints);
// Console.WriteLine(nextBest);

// //TODO: handle a grey L when there's 2 L's and one is in the right spot and the other is not
// //ALOFT => guessed ALLOY and got 🟩🟩⬜🟨⬜
// currentConstraints = new Constraints 
// {
//     ExcludedLetters = new[] { 'S', 'N', 'E', 'B', 'R', 'D', 'Y' },
//     IncludedLetters = new[] {
//         new LetterWithIndex('A', 1),
//         new LetterWithIndex('A', 2),
//         new LetterWithIndex('O', 1),
//         new LetterWithIndex('O', 3),
//     },
// };
// nextBest = GetBestRemainingWord(currentConstraints);
// Console.WriteLine(nextBest);


// GetLetterFrequencies();

static int GetGreenScoreFor(string word)
{
    var countsOfGreens = 0;
    foreach (var wordToCheck in Derp.All5LetterWords)
    {
        for (int i = 0; i < 5; i++)
        {
            if (word[i] == wordToCheck[i]) { countsOfGreens++; }
        }
    }
    return countsOfGreens;
    //sales or sanes best for greenseek
}

static void GetLetterFrequencies()
{
    var letterFrequency = Derp.All5LetterWords.SelectMany(w => w).GroupBy(s => s).OrderByDescending(l => l.Count());

    Console.WriteLine(string.Join(",", letterFrequency.Select(s => s.Key)));
    //arose best for yellows
}


static string GetBestRemainingWord(Constraints currentConstraints)
{
    //todo try toarray on all of em
    var remainingWords = Derp.Ranked5LetterWords;
    if (currentConstraints.KnownLetters.Any())
    {
        foreach (var knownLetter in currentConstraints.KnownLetters)
        {
            remainingWords = remainingWords.Where(w => w.Word[knownLetter.Index] == knownLetter.Letter);
        }
    }
    Console.WriteLine($"Done exacting: {string.Join(",", remainingWords.Take(25).Select(w => w.Word))}");

    if (currentConstraints.ExcludedLetters.Any())
    {
        remainingWords = remainingWords.Where(w => !w.Word.Any(l => currentConstraints.ExcludedLetters.Contains(l)));
    }
    Console.WriteLine($"Done excluding: {string.Join(",", remainingWords.Take(25).Select(w => w.Word))}");

    if (currentConstraints.IncludedLetters.Any())
    {
        foreach (var includedLetter in currentConstraints.IncludedLetters)
        {
            remainingWords = remainingWords.Where(w => w.Word.Contains(includedLetter.Letter) && w.Word[includedLetter.Index] != includedLetter.Letter);
        }
    }
    Console.WriteLine($"Done including: {string.Join(",", remainingWords.Take(25).Select(w => w.Word))}");

    return remainingWords.OrderByDescending(w => w.Ranking).FirstOrDefault().Word;
}

public class LetterWithIndex
{
    public LetterWithIndex(char letter, int index)
    {
        Letter = letter;
        Index = index;
    }

    public int Index { get; set; }
    public char Letter { get; set; }
}

public class WordWithRanking
{
    public string Word { get; set; }
    public int Ranking { get; set; }
}

public class Constraints
{
    public IEnumerable<LetterWithIndex> IncludedLetters { get; set; } = new LetterWithIndex[] { };
    public IEnumerable<char> ExcludedLetters { get; set; } = new char[] { };
    public IEnumerable<LetterWithIndex> KnownLetters { get; set; } = new LetterWithIndex[] { };
}

public static class Derp
{
    public static IEnumerable<string> All5LetterWords = new string[] { };
    public static IEnumerable<WordWithRanking> Ranked5LetterWords = new WordWithRanking[] { };
}
