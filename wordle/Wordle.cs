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

var currentConstraints = new Constraints
{
    ExcludedLetters = new[] { 'L' },
    IncludedLetters = new[] {
        new LetterWithIndex('O', 3),
    },
    KnownLetters = new LetterWithIndex[] {
        new LetterWithIndex('A', 0),
        new LetterWithIndex('L', 1),
    },
};
var nextBest = GetBestRemainingWord(currentConstraints);
Console.WriteLine(nextBest);

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
        foreach (var excludedLetter in currentConstraints.ExcludedLetters)
        {
            var matchingKnownLetter = currentConstraints.KnownLetters.FirstOrDefault(kl => kl.Letter == excludedLetter);
            if (matchingKnownLetter != null)
            {
                Console.WriteLine($"Matching known letter with excluded letter: {matchingKnownLetter.Letter}");
                //if word is ALOFT and we guess ALLOY, we'll get a ⬜ on index 2, even though it does contain an L
                remainingWords = remainingWords.Where(w =>
                    //for every letter in this word
                    w.Word.Select((l, i) =>
                        //either it IS NOT the excluded letter
                        l != excludedLetter
                        //OR it IS the the excluded letter, but the index matches the known letter
                        ||
                        i == matchingKnownLetter.Index
                    ).All(x => x)
                );
            }
            else
            {
                remainingWords = remainingWords.Where(w => !w.Word.Any(l => currentConstraints.ExcludedLetters.Contains(l)));
            }
        }
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
