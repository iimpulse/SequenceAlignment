class Aligner:
    """
        A class to align two sequences with the
        Hirschberg's algorithm an extension of NW algorithm
    """

    def __init__(self, seq1, seq2, match = 1, mismatch = -1, gap = -1):
        self.first_seq = seq1
        self.second_seq = seq2
        cols = len(self.first_seq) + 1
        rows = len(self.second_seq) + 1
        self.fscore = [[0] * cols for x in range(rows)]
        self.mismatch = mismatch
        self.gap = gap
        self.match = match
        self.init_matrix()
        for x in self.fscore:
            print(x)
    """
        This function compares two nucleotides and returns a match 
        score if match and a mismatch score if they dont.
    :param nta the nucleotide from sequence 1
    :param ntb the nucleotide from sequence 2
    """
    def score(self, nta, ntb):
        if nta == ntb:
            return self.match
        return self.mismatch


    """
        Initalizes the score matrix used in the NW algorithm
        Do it row by row

    """
    def init_matrix(self):
        # Initialize the score matrix
        d = self.mismatch
        first = self.first_seq
        second = self.second_seq
        for i in range(len(first) + 1):
            self.fscore[0][i] = d * i
        for k in range(len(second) + 1):
            self.fscore[k][0] = d * k

        for k in range(1, len(second) + 1):
            for i in range(1, len(first) + 1):
                match = self.fscore[k - 1][i - 1] + self.score(first[i - 1], second[k - 1])
                delete = self.fscore[k][i - 1] + d
                insert = self.fscore[k - 1][i] + d
                self.fscore[k][i] = max(match, delete, insert)

    def align(self):
        print(self.first_seq)
        print(self.second_seq)

Aligner("GCATGCU","GATTACA")
